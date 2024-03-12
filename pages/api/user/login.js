import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method == "POST") {
    // console.log(req.body)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    })
    if (error) {
      console.log("Supbase login error")
      console.log(error)
      // console.log("Error message")
      // console.log(error.message)
      // console.log(error.status)
      // console.log("Error name")
      // console.log(error.name)

      if (error.message == "Invalid login credentials") {
        return res.status(401).json("Invalid credentials")
      } else {
        return res.status(500).json("Unable to log in.")
      }
    }
    return res.status(200).json(data)
  }
}
