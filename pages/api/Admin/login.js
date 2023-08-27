import { supabase } from "@/lib/supabaseClient"
const bcrypt = require('bcrypt')
const {match} = require('assert')

export default async function handler(req,res) {
    if(req.method == "POST") {
        console.log(req.body)

        
    const { data, error } = await supabase
    .from('Admin')
    .select('hashed_password')
    .eq('email', req.body.email)
    console.log(data)
    if(error) {
      console.log(error)
      return res.status(500).json('Unable to Log In.')
    }
    const match = await bcrypt.compare(req.body.password, data[0].hashed_password)
    if(match) {
      console.log('Logged In.')
      return res.status(200).json(req.body)
    }
    else {
      console.log('Wrong details')
      console.log(req.body)
         return res.status(400).json({Error: 'tmkc'})
   }
  }
}