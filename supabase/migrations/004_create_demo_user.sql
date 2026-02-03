-- Create Demo User for Testing
-- Run this in Supabase SQL Editor to create demo credentials

-- Note: This creates a user in auth.users and a profile in public.profiles
-- Demo Credentials: demo@vignan.edu / Demo@2026

-- First, create the auth user (if not exists)
-- You may need to do this through Supabase Dashboard > Authentication > Users
-- Because auth.users table requires special handling

-- Create profile entry for demo user
-- Replace 'USER_UUID_HERE' with the actual UUID after creating the user in Auth

INSERT INTO public.profiles (
  id,
  full_name,
  registration_number,
  school,
  program,
  year,
  section,
  email,
  father_name,
  mother_name,
  transcript_eligible,
  created_at
) VALUES (
  'USER_UUID_HERE', -- Replace with actual UUID from auth.users after creating user
  'Demo Student',
  '12345678',
  'School of Computer Science and Engineering',
  'B.Tech Computer Science and Engineering',
  '3',
  'A',
  'demo@vignan.edu',
  'Father Name',
  'Mother Name',
  true,
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  registration_number = EXCLUDED.registration_number,
  school = EXCLUDED.school,
  program = EXCLUDED.program,
  year = EXCLUDED.year,
  section = EXCLUDED.section,
  email = EXCLUDED.email;

-- Instructions:
-- 1. Go to Supabase Dashboard
-- 2. Navigate to Authentication > Users
-- 3. Click "Add user" > "Create new user"
-- 4. Email: demo@vignan.edu
-- 5. Password: Demo@2026
-- 6. Click "Create user"
-- 7. Copy the user's UUID
-- 8. Replace 'USER_UUID_HERE' above with the copied UUID
-- 9. Run this SQL in SQL Editor
