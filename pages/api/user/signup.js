import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, rollNo, contact, email, password } = req.body

    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      }, {
        data: {
          name: name,
          rollNo: rollNo,
          contact: contact,
        },
      })

      if (error) {
        console.error(error)
        return res.status(500).json({ error: "Signup failed" })
      }

      return res.status(200).json({ user })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Signup failed" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
