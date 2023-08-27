import { supabase } from "@/lib/supabaseClient"


export default async function handler(req,res) {
    if (req.method == "GET") {
    console.log(req.query)
    req.query.riddle_id = parseInt(req.query.riddle_id)
    console.log(typeof(req.query.riddle_id))
    
    const { data, error } = await supabase
    .from('Riddle')
    .select('answer')
    .eq('riddle_id', req.query.riddle_id)
    console.log(data)
    if(error) {
      console.log(error)
      return res.status(500).json('Unable to nadd riddle.')
    }
    if(data[0].answer == req.query.answer) {
      console.log('Correct answer')
      return res.status(200).json({msg: 'Sahi jawab 150 rupees.'})
    }
    else {
      console.log('Wrong answer')
      console.log(req.query.answer)
         return res.status(400).json({Error: 'tmkc'})
   }
  }
}