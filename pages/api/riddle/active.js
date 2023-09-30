import { supabase } from "@/lib/supabaseClient"

//? Can we directly update the active status of a riddle in the database?
// ? I mean, without having to retrieve the current status first?

export default async function handler(req, res) {
  if (req.method == "PATCH") {
    console.log(req.body)

    const { id } = req.body

    try {
      // Retrieve the current 'active' status of the record
      const { data: currentData, error } = await supabase
        .from("Riddle") // Replace with your actual table name
        .select("active")
        .eq("riddle_id", id)

      if (error) {
        throw error
      }

      // Toggle the 'active' status
      const newActiveStatus = !currentData[0].active

      // Update the 'active' column in your Supabase table
      const { data, error: updateError } = await supabase
        .from("Riddle") // Replace with your actual table name
        .update({ active: newActiveStatus })
        .eq("riddle_id", id)

      if (updateError) {
        throw updateError
      }

      res.status(200).json({ message: "Record updated successfully", data })
    } catch (error) {
      console.error("Error updating record:", error.message)
      res.status(500).json({ message: "Error updating record" })
    }
  }
}
