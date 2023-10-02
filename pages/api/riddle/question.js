import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method == "GET") {
    // console.log(req.query)

    const { data, error } = await supabase
      .from("Riddle")
      .select("question, riddle_id, date")
      .eq("active", true)
      .order("riddle_id", { ascending: true })
    //.eq('riddle_id', req.query.riddle_id)
    // console.log(data)
    if (error) {
      console.log(error)
      return res.status(500).json("Unable to nadd riddle.")
    }
    return res.status(200).json(data)
  }
}
