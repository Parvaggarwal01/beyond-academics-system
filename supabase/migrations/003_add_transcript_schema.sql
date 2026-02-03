-- Migration: Add Transcript System Schema
-- Description: Adds semester tracking, transcript table, and eligibility fields
-- Date: 2026-02-03

-- =====================================================
-- STEP 1: Update beyond_academics_achievements table
-- =====================================================

-- Add semester and academic year fields to achievements
ALTER TABLE beyond_academics_achievements 
ADD COLUMN IF NOT EXISTS semester VARCHAR(20),
ADD COLUMN IF NOT EXISTS academic_year VARCHAR(10);

-- Create index for faster semester-based queries
CREATE INDEX IF NOT EXISTS idx_achievements_semester ON beyond_academics_achievements(user_id, semester, academic_year);
CREATE INDEX IF NOT EXISTS idx_achievements_status_semester ON beyond_academics_achievements(user_id, semester, status);

-- Add comment to columns
COMMENT ON COLUMN beyond_academics_achievements.semester IS 'Semester in which achievement was earned (e.g., Sem-1, Sem-2)';
COMMENT ON COLUMN beyond_academics_achievements.academic_year IS 'Academic year of achievement (e.g., 2024-25, 2025-26)';


-- =====================================================
-- STEP 2: Update profiles table
-- =====================================================

-- Add transcript eligibility tracking fields
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS father_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS mother_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS transcript_eligible BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_transcript_generated TIMESTAMP;

-- Add comment to columns
COMMENT ON COLUMN profiles.father_name IS 'Father name for transcript';
COMMENT ON COLUMN profiles.mother_name IS 'Mother name for transcript';
COMMENT ON COLUMN profiles.transcript_eligible IS 'Whether user is eligible to generate transcript';
COMMENT ON COLUMN profiles.last_transcript_generated IS 'Last time transcript was generated';


-- =====================================================
-- STEP 3: Create achievement_transcripts table
-- =====================================================

CREATE TABLE IF NOT EXISTS achievement_transcripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  semester VARCHAR(20) NOT NULL,
  academic_year VARCHAR(10) NOT NULL,
  transcript_data JSONB NOT NULL,
  verification_code VARCHAR(50) UNIQUE NOT NULL,
  generated_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'final', 'revoked')),
  approved_by UUID REFERENCES profiles(id),
  approval_date TIMESTAMP,
  total_points INTEGER NOT NULL DEFAULT 0,
  grade VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_transcripts_user ON achievement_transcripts(user_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_semester ON achievement_transcripts(user_id, semester, academic_year);
CREATE INDEX IF NOT EXISTS idx_transcripts_verification ON achievement_transcripts(verification_code);
CREATE INDEX IF NOT EXISTS idx_transcripts_status ON achievement_transcripts(status);

-- Add comments
COMMENT ON TABLE achievement_transcripts IS 'Stores generated achievement transcripts for students';
COMMENT ON COLUMN achievement_transcripts.semester IS 'Semester covered by this transcript';
COMMENT ON COLUMN achievement_transcripts.academic_year IS 'Academic year of transcript';
COMMENT ON COLUMN achievement_transcripts.transcript_data IS 'Complete transcript data in JSON format';
COMMENT ON COLUMN achievement_transcripts.verification_code IS 'Unique code for transcript verification';
COMMENT ON COLUMN achievement_transcripts.status IS 'Transcript status: draft, final, or revoked';
COMMENT ON COLUMN achievement_transcripts.total_points IS 'Total points earned in this semester';
COMMENT ON COLUMN achievement_transcripts.grade IS 'Grade assigned based on total points';


-- =====================================================
-- STEP 4: Create helper functions
-- =====================================================

-- Function to check if user is eligible for transcript generation
CREATE OR REPLACE FUNCTION check_transcript_eligibility(p_user_id UUID, p_semester VARCHAR)
RETURNS TABLE (
  is_eligible BOOLEAN,
  total_achievements INTEGER,
  approved_count INTEGER,
  pending_count INTEGER,
  rejected_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END), 0) = 0 
      AND COUNT(*) > 0 AS is_eligible,
    COUNT(*)::INTEGER AS total_achievements,
    COALESCE(SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END), 0)::INTEGER AS approved_count,
    COALESCE(SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END), 0)::INTEGER AS pending_count,
    COALESCE(SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END), 0)::INTEGER AS rejected_count
  FROM beyond_academics_achievements
  WHERE user_id = p_user_id AND semester = p_semester;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION check_transcript_eligibility IS 'Checks if user is eligible to generate transcript for a semester';


-- Function to calculate grade based on points
CREATE OR REPLACE FUNCTION calculate_achievement_grade(p_points INTEGER)
RETURNS VARCHAR AS $$
BEGIN
  RETURN CASE
    WHEN p_points >= 900 THEN 'Outstanding (O)'
    WHEN p_points >= 750 THEN 'Excellent (A+)'
    WHEN p_points >= 600 THEN 'Very Good (A)'
    WHEN p_points >= 450 THEN 'Good (B+)'
    WHEN p_points >= 300 THEN 'Above Average (B)'
    WHEN p_points >= 150 THEN 'Average (C)'
    ELSE 'Developing (D)'
  END;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION calculate_achievement_grade IS 'Calculates grade based on total achievement points';


-- Function to generate verification code
CREATE OR REPLACE FUNCTION generate_verification_code(
  p_user_id UUID,
  p_semester VARCHAR,
  p_academic_year VARCHAR
)
RETURNS VARCHAR AS $$
DECLARE
  v_reg_number VARCHAR;
  v_code VARCHAR;
BEGIN
  -- Get registration number
  SELECT registration_number INTO v_reg_number
  FROM profiles WHERE id = p_user_id;
  
  -- Generate code: BA-TR-{YEAR}-{REG_NO}-{SEM}
  v_code := 'BA-TR-' || 
            SPLIT_PART(p_academic_year, '-', 1) || '-' ||
            COALESCE(v_reg_number, 'UNREG') || '-' ||
            REPLACE(p_semester, 'Sem-', 'S');
  
  -- Add timestamp hash for uniqueness
  v_code := v_code || '-' || SUBSTRING(MD5(NOW()::TEXT), 1, 6);
  
  RETURN v_code;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION generate_verification_code IS 'Generates unique verification code for transcript';


-- =====================================================
-- STEP 5: Create triggers for auto-updating timestamps
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_transcripts_updated_at ON achievement_transcripts;
CREATE TRIGGER update_transcripts_updated_at
  BEFORE UPDATE ON achievement_transcripts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- =====================================================
-- STEP 6: Enable Row Level Security (RLS)
-- =====================================================

ALTER TABLE achievement_transcripts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own transcripts
DROP POLICY IF EXISTS "Users can view own transcripts" ON achievement_transcripts;
CREATE POLICY "Users can view own transcripts"
  ON achievement_transcripts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own transcripts
DROP POLICY IF EXISTS "Users can create own transcripts" ON achievement_transcripts;
CREATE POLICY "Users can create own transcripts"
  ON achievement_transcripts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own draft transcripts
DROP POLICY IF EXISTS "Users can update own draft transcripts" ON achievement_transcripts;
CREATE POLICY "Users can update own draft transcripts"
  ON achievement_transcripts
  FOR UPDATE
  USING (auth.uid() = user_id AND status = 'draft')
  WITH CHECK (auth.uid() = user_id);

-- Policy: Allow public verification (read-only for verification page)
DROP POLICY IF EXISTS "Public can verify transcripts" ON achievement_transcripts;
CREATE POLICY "Public can verify transcripts"
  ON achievement_transcripts
  FOR SELECT
  USING (status = 'final');


-- =====================================================
-- STEP 7: Insert sample data for testing (Optional)
-- =====================================================

-- This can be commented out in production
-- Just shows example of how data should look

/*
-- Example: Update existing achievements with semester info
UPDATE beyond_academics_achievements
SET 
  semester = 'Sem-1',
  academic_year = '2024-25'
WHERE date >= '2024-07-01' AND date < '2025-01-01';

UPDATE beyond_academics_achievements
SET 
  semester = 'Sem-2',
  academic_year = '2024-25'
WHERE date >= '2025-01-01' AND date < '2025-07-01';
*/


-- =====================================================
-- STEP 8: Grant necessary permissions
-- =====================================================

-- Grant usage on functions
GRANT EXECUTE ON FUNCTION check_transcript_eligibility TO authenticated;
GRANT EXECUTE ON FUNCTION calculate_achievement_grade TO authenticated;
GRANT EXECUTE ON FUNCTION generate_verification_code TO authenticated;


-- =====================================================
-- Migration Complete
-- =====================================================

-- Verify the migration
DO $$
BEGIN
  RAISE NOTICE 'Migration 003_add_transcript_schema completed successfully';
  RAISE NOTICE 'Tables updated: beyond_academics_achievements, profiles';
  RAISE NOTICE 'Tables created: achievement_transcripts';
  RAISE NOTICE 'Functions created: check_transcript_eligibility, calculate_achievement_grade, generate_verification_code';
END $$;
