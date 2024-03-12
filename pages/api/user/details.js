import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { user_id } = req.query
    // console.log(user_id)

    // Fetch score of the user
    const { data, error } = await supabase
      .from("participant")
      .select("scores, solved_questions")
      .eq("id", user_id)

    if (error) {
      console.log("Supabase error")
      console.log(error)
      return res.status(500).json("Unable to fetch user details.")
    }

    return res.status(200).json(data[0])
    // return res.status(200).json("data")
  }
}
