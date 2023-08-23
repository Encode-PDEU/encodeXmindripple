import { createClient } from "@supabase/supabase-js"

// "Supabase URL" and "Supabase Key"
const supabaseUrl = "https://lqinxgfhexzawgkrgoad.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, {
  autoRefreshToken: false,
  persistSession: false,
  detectSessionInUrl: false,
})