import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error(error)
        return res.status(500).json({ error: "Unable to log out." })
      }

      return res.status(200).json({ message: "User logged out successfully." })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Unable to log out." })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
