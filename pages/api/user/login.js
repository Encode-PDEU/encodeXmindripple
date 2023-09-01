import { supabase } from "@/lib/supabaseClient"

export default async function handler(req,res) {
    if(req.method == "POST") {
        console.log(req.body)

const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  })
  if(error) {
    console.log(error)
    return res.status(500).json('Unable to log in.')
  }
  return res.status(200).json(data)
  
  }
}