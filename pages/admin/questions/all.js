import React, { useState, useEffect } from "react"
import axios from "axios"
import { getSession } from "next-auth/react"
import { ReactMatrixAnimation } from "react-matrix-animation"
import SideNav from "../sidenav"
import { Oswald, Roboto } from "next/font/google"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { MoonLoader } from "react-spinners"
import { useRouter } from "next/router"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/admin/login",
//         permanent: false,
//       },
//     }
//   }
// }

const Allquestions = () => {
  const router = useRouter()
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin/login")
      return
    }

    console.log("Request fired")
    setIsLoading(true)
    axios
      .get(`${API_URL}/admin/allQuestions`)
      .then((res) => {
        console.log(res.data)
        setQuestions(res.data)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const [activeRiddleIndex, setActiveRiddleIndex] = useState(0)
  // console.log(activeRiddleIndex)

  const handlePreviousClick = () => {
    const newIndex = Math.max(activeRiddleIndex - 1, 0)
    setActiveRiddleIndex(newIndex)
  }

  const handleNextClick = () => {
    const newIndex = Math.min(activeRiddleIndex + 1, questions.length - 1)
    setActiveRiddleIndex(newIndex)
  }

  const [isActivating, setIsActivating] = useState(false)

  const handleActivate = (riddle) => {
    // console.log(riddle)
    setIsActivating(true)
    axios
      .patch(`${API_URL}/riddle/active`, { id: riddle.riddle_id })
      .then((res) => {
        // console.log(res.data)
        toast.success("Question Activated Successfully")

        // Update the 'active' status of the question in the local state
        const newQuestions = [...questions]
        newQuestions[activeRiddleIndex].active =
          !newQuestions[activeRiddleIndex].active
        setQuestions(newQuestions)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
      .finally(() => {
        setIsActivating(false)
      })
  }

  if (isLoading) {
    return (
      <>
        <div className="flex flex-row">
          <div>
            {/* Left part */}
            <SideNav />
          </div>

          {/* Right part */}
          <div className=" flex flex-row flex-grow justify-center items-center">
            <div className=" flex flex-col items-center">
              <MoonLoader color="#ffffff" loading={isLoading} size={50} />
              <h1 className="text-custom-yellowtext-3xl font-semibold mt-4">
                Loading Questions...
              </h1>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (questions.length == 0) {
    return (
      <>
        <div className="flex flex-row">
          <div>
            {/* Left part */}
            <SideNav />
          </div>

          {/* Right part */}
          <div className=" flex flex-row flex-grow justify-center items-center">
            <div className=" flex flex-col items-center">
              <h1 className="text-custom-yellow text-3xl font-semibold mt-4">
                No Questions Posted Yet
              </h1>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={`${roboto.className} flex flex-row`}>
      <div>
        {/* Left part */}
        <SideNav />
      </div>

      {/* Right part */}
      <div className=" flex flex-row flex-grow justify-center mt-32">
        <div className="text-center relative w-full mx-8">
          {activeRiddleIndex != 0 && (
            <button
              className="text-custom-grey text-3xl w-[60px] h-[60px] bg-custom-161616 rounded-full absolute left-0 top-1/2 transform -translate-y-1/2 ml-2"
              onClick={handlePreviousClick}
            >
              {" "}
              &lt;
            </button>
          )}

          <p
            className={`${oswald.className} text-7xl font-semibold text-custom-yellow`}
          >
            ALL QUESTIONS
          </p>
          <div className="mt-12">
            <p className="text-custom-green font-semibold text-6xl">
              {questions[activeRiddleIndex]?.riddle_id}
            </p>
            <p className="text-custom-grey text-2xl mt-10 font-normal w-4/5 m-auto">
              {questions[activeRiddleIndex]?.question}
            </p>
          </div>

          {activeRiddleIndex != questions.length - 1 && (
            <button
              className="text-white text-3xl w-[60px] h-[60px] bg-custom-161616 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
              onClick={handleNextClick}
            >
              &gt;
            </button>
          )}

          <div className="flex md:flex-col mt-5 flex-row md:items-center md:justify-center justify-start ">
            <div className="text-center flex flex-row md:flex-col pl-10">
              <p
                // type="text"
                // onChange={(e) => setUserAnswer(e.target.value)}
                className="mt-6 text-gray-500 font-medium text-2xl text-center bg-transparent border-gray-500 outline-none md:w-[502px] w-[160px]"
                // placeholder="Enter your answer"
              >
                Answer:{" "}
                <span className="ml-3">
                  {questions[activeRiddleIndex]?.answer}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-7">
            <button
              className={`bg-yellow-500 text-black text-xl px-4 py-1 rounded-md font-medium"
              ${
                isActivating ? "cursor-not-allowed opacity-50" : "bg-yellow-500"
              }

              ${
                questions[activeRiddleIndex]?.active &&
                "bg-green-500 cursor-not-allowed opacity-50"
              }

              `}
              onClick={() => handleActivate(questions[activeRiddleIndex])}
              disabled={isActivating && questions[activeRiddleIndex]?.active}
            >
              {questions[activeRiddleIndex]?.active ? (
                "Activated"
              ) : (
                <>
                  {isActivating ? (
                    <div className="flex justify-center items-center">
                      <p className="mr-2">Activating</p>
                      <MoonLoader
                        size={20}
                        color={"#000000"}
                        loading={isActivating}
                      />
                    </div>
                  ) : (
                    "Activate Question"
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allquestions
