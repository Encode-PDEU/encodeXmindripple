import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("participant")
      .select("name, email, scores, solved_questions")
      .order("scores", { ascending: false })

    if (error) {
      console.log(error)
      return res.status(500).json({ error: error.message })
    }
    res.status(200).json(data)

    //   return res.status(200).json({ message: "Hello" })
  }
}
