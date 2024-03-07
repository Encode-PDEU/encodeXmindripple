import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method == "POST") {
    // console.log(req.body)

    const { name, rollNo, contact, email, password } = req.body

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          rollNo: rollNo,
          contact: contact,
        },
      },
    })
    if (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })
    }
    return res.status(200).json(data)
  }
}
