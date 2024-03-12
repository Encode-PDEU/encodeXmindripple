import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method == "GET") {
    // console.log(req.query)
    req.query.riddle_id = parseInt(req.query.riddle_id)
    req.query.score = parseInt(req.query.score)
    // console.log(typeof req.query.riddle_id)

    const { data, error } = await supabase
      .from("Riddle")
      .select("answer")
      .eq("riddle_id", req.query.riddle_id)
    // console.log(data)
    if (error) {
      console.log(error)
      return res.status(500).json("Unable to nadd riddle.")
    }
    if (data[0].answer == req.query.answer) {
      const { data, error } = await supabase.rpc("append_to_user_model", {
        user_email: req.query.email,
        question_id: req.query.riddle_id,
      })

      const { data: details, error: details_error } = await supabase.rpc(
        "append_to_detail_score",
        {
          user_email: req.query.email,
          score: req.query.score,
          riddle_id: req.query.riddle_id,
        }
      )

      // console.log("Correct answer")
      // console.log(typeof req.query.score)
      if (error || details_error) {
        console.log(error || details_error)
        return res.status(500).json("Unable to add to table")
      }
      const { data: score_data, error: score_error } = await supabase.rpc(
        "incrementscore",
        {
          user_email: req.query.email,
          score_gain: parseInt(req.query.score),
        }
      )
      // console.log("Score Added")
      if (score_error) {
        console.log(score_error)
        return res.status(500).json("Unable to add to table")
      }
      return res.status(200).json({
        msg: `Correct Answer. You have gained ${req.query.score} points`,
      })
    } else {
      console.log("Wrong answer")
      console.log(req.query.answer)
      return res.status(400).json({ message: "Wrong Answer. Please Try again" })
    }
  }
}
