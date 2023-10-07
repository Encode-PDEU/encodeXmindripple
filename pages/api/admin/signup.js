import { supabase } from "@/lib/supabaseClient"
const bcrypt = require("bcrypt")

export default async function handler(req, res) {
  if (req.method == "POST") {
    console.log(req.body)

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    const { error } = await supabase
      .from("Admin")
      .insert({ email: req.body.email, hashed_password: hash })

    if (error) {
      console.log(error)
      return res.status(500).json("Unable to signup.")
    }
    return res.status(200).json(req.body)
  }
}
