import React, { useState, useEffect } from "react"
import axios from "axios"
import SideNav from "../sidenav"
import { getSession } from "next-auth/react"
import { ReactMatrixAnimation } from "react-matrix-animation"
import DatePicker from "react-datepicker" // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css" // Import the styles
import { Oswald, Roboto } from "next/font/google"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { MoonLoader } from "react-spinners"
// import DateTimePicker from "react-datetime-picker"
// import "react-datetime-picker/dist/DateTimePicker.css"
// import "react-calendar/dist/Calendar.css"
// import "react-clock/dist/Clock.css"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const API_URL = process.env.NEXT_PUBLIC_API_URL

const Postquestion = () => {
  const router = useRouter()

  const [admin, setAdmin] = useState()

  useEffect(() => {
    // Check if admin is logged in
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin/login")
    }

    setAdmin(JSON.parse(localStorage.getItem("admin_token")))
  }, [])

  // console.log(admin?.email)

  // const [isMobile, setIsMobile] = useState(false)

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    date: new Date(),
    time: "",
  })

  const handleFormData = (e) => {
    e.preventDefault()

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate,
    })
  }

  const [isLoading, setIsLoading] = useState(false)

  const handlePost = (event) => {
    event.preventDefault()
    // console.log(formData)

    if (Object.keys(formData).some((k) => formData[k] == "")) {
      toast.error("Please fill all the fields")
      return
    }

    setIsLoading(true)

    axios
      .post(`${API_URL}/riddle/add`, {
        ...formData,
        added_by: admin?.email,
      })
      .then((res) => {
        console.log(res.data)
        toast.success("Question posted successfully")
        setFormData({
          question: "",
          answer: "",
          date: new Date(),
          time: "",
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error("Unable to post question")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="flex flex-row">
      {/* {isMobile && <ReactMatrixAnimation />} */}
      <div>
        {/* left part */}
        <SideNav />
      </div>
      {/* right part */}

      <div className=" flex flex-col mt-3  ml-4">
        <div
          className={`${oswald.className} text-4xl font-semibold text-yellow-500 mb-2`}
        >
          POST QUESTION
        </div>
        <div className="flex flex-row mt-4">
          <form className="flex flex-col items-start">
            <label className="font-normal text-2xl" htmlFor="question">
              Question
            </label>
            <textarea
              className="h-[100px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-xl font-normal p-4"
              placeholder="Enter Question"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleFormData}
              required
            ></textarea>
            <label className="font-normal text-22xl" htmlFor="answer">
              Answer
            </label>
            <input
              className="h-[65px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-xl font-normal p-4 "
              placeholder="Enter Correct Answer"
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleFormData}
              required
            />
            <label className="font-normal text-2xl">Date</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="MMMM dd, yyyy"
              className="h-[65px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-2xl p-4"
              required
            />

            <label className="font-normal text-22xl" htmlFor="time">
              Time
            </label>
            <input
              className="h-[65px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-xl font-normal p-4 "
              placeholder="Format: 00:00:00"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleFormData}
              required
            />

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className={`inline-block align-baseline font-semibold text-2xl bg-yellow-500 w-[200px] h-[50px] rounded py-2 px-4 text-black
                ${
                  isLoading
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-yellow-600 hover:text-white"
                }
                `}
                onClick={handlePost}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <p className="mr-2">Adding</p>
                    <MoonLoader
                      size={20}
                      color={"#000000"}
                      loading={isLoading}
                    />
                  </div>
                ) : (
                  "POST"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Postquestion
