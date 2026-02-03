export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      beyond_academics_achievements: {
        Row: {
          id: string
          created_at: string
          user_id: string | null
          title: string
          category: string
          event_type: string | null
          date: string
          organizer: string
          level: string
          position: string
          description: string | null
          certificate_url: string | null
          school: string
          program: string
          calculated_points: number | null
          category_code: string | null
          competition_scope: string | null
          status: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          semester: string | null
          academic_year: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id?: string | null
          title: string
          category: string
          event_type?: string | null
          date: string
          organizer: string
          level: string
          position: string
          description?: string | null
          certificate_url?: string | null
          school: string
          program: string
          calculated_points?: number | null
          category_code?: string | null
          competition_scope?: string | null
          status?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          semester?: string | null
          academic_year?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string | null
          title?: string
          category?: string
          event_type?: string | null
          date?: string
          organizer?: string
          level?: string
          position?: string
          description?: string | null
          certificate_url?: string | null
          school?: string
          program?: string
          calculated_points?: number | null
          category_code?: string | null
          competition_scope?: string | null
          status?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          semester?: string | null
          academic_year?: string | null
        }
        Relationships: []
      }
      achievement_transcripts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          semester: string
          academic_year: string
          transcript_data: Json
          verification_code: string
          generated_at: string
          is_final: boolean
          status: string
          approved_by: string | null
          approval_date: string | null
          total_points: number
          grade: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          semester: string
          academic_year: string
          transcript_data: Json
          verification_code?: string
          generated_at?: string
          is_final?: boolean
          status?: string
          approved_by?: string | null
          approval_date?: string | null
          total_points?: number
          grade?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          semester?: string
          academic_year?: string
          transcript_data?: Json
          verification_code?: string
          generated_at?: string
          is_final?: boolean
          status?: string
          approved_by?: string | null
          approval_date?: string | null
          total_points?: number
          grade?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievement_transcripts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string | null
          full_name: string | null
          school: string | null
          program: string | null
          registration_number: string | null
          phone: string | null
          avatar_url: string | null
          father_name: string | null
          mother_name: string | null
          transcript_eligible: boolean | null
          last_transcript_generated: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          school?: string | null
          program?: string | null
          registration_number?: string | null
          phone?: string | null
          avatar_url?: string | null
          father_name?: string | null
          mother_name?: string | null
          transcript_eligible?: boolean | null
          last_transcript_generated?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          school?: string | null
          program?: string | null
          registration_number?: string | null
          phone?: string | null
          avatar_url?: string | null
          father_name?: string | null
          mother_name?: string | null
          transcript_eligible?: boolean | null
          last_transcript_generated?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
