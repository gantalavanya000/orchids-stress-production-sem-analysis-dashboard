import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface QuestionnaireResponse {
  id?: string
  user_id: string
  user_email: string
  designation: string
  work_location: string
  work_hours_range: string
  avg_working_hours: number
  work_pressure: number
  manager_support: number
  work_life_balance: string
  sleeping_habit: number
  exercise_habit: number
  social_person: number
  job_satisfaction: number
  stress_level?: number
  productivity_score?: number
  created_at?: string
}
