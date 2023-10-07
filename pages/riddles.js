import { useEffect, useState, useMemo } from "react"
import React from "react"
import { getSession } from "next-auth/react"
import NavBar from "../components/navbar"
import { ReactMatrixAnimation } from "react-matrix-animation"
import { Oswald, Roboto } from "next/font/google"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { MoonLoader } from "react-spinners"
// import { supabaseAuthAdmin } from "@/lib/supabaseAuthAdmin"
import Confetti from "react-confetti"
// import riddlesData from "@/dummy_data/riddles"
// import Countdown from "react-countdown"
import CountdownTimer from "@/components/countdown"
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi"

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
//         destination: "/login",
//         permanent: false,
//       },
//     }
//   }
// }

const MemoizedCountdownTimer = React.memo(CountdownTimer)

const Riddles = () => {
  console.log(
    "----------------------------------------------------------------"
  )
  const [activeRiddleIndex, setActiveRiddleIndex] = useState(0)
  console.log("Active riddle index: ", activeRiddleIndex)
  // const [userAnswer, setUserAnswer] = useState("")
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  const [riddlesData, setRiddlesData] = useState([
    {
      question:
        "1st Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis?",
      riddle_id: 67,
      date: "2023-10-12T13:32:28.000Z",
    },
    {
      question:
        "2nd Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis?",
      riddle_id: 68,
      date: "2023-12-12T13:32:28.000Z",
    },
    {
      question: "Eum magni dolore obc",
      riddle_id: 69,
      date: "2023-10-12T13:32:28.000Z",
    },
  ])
  console.log("Riddles data: ")
  console.log(riddlesData)
  const [isLoading, setIsLoading] = useState(false)

  // User has not answered any question yet
  // const [currentUserDetails, setCurrentUserDetails] = useState({
  //   scores: 10,
  //   solved_questions: [],
  // })

  // User has answered some questions
  const [currentUserDetails, setCurrentUserDetails] = useState({
    scores: 10,
    solved_questions: ["67", "68"],
  })
  console.log("Current user details: ")
  console.log(currentUserDetails)
  const [userToken, setUserToken] = useState(null)

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
  console.log("Is next button disabled: ", isNextButtonDisabled)

  const checkNextButtonDisabled = () => {
    // TODO: Enable next button only if the user has answered the current riddle

    // If current riddle index is in the solved questions array of the user, then it means that the user has answered the current riddle => enable next button

    // console.log("IMP")
    // console.log(currentUserDetails)
    // console.log(riddlesData[activeRiddleIndex]?.riddle_id.toString())

    if (
      currentUserDetails?.solved_questions?.includes(
        riddlesData[activeRiddleIndex]?.riddle_id.toString() // need to convert to string because the solved_questions array contains string values
      )
    ) {
      console.log("Current riddle is answered")
      setIsNextButtonDisabled(false)
    } else {
      console.log("Current riddle is not answered")
      setIsNextButtonDisabled(true)
    }
  }

  const [questionsAnswered, setQuestionsAnswered] = useState([
    {
      riddle_id: "67",
      answer: "cat",
    },
    {
      riddle_id: "68",
      answer: "cat",
    },
  ])
  // console.log("Questions answered: ")
  // console.log(questionsAnswered)

  // useEffect(() => {
  //   console.log("Request fired")

  //   const token = JSON.parse(localStorage.getItem("token"))
  //   console.log(token)
  //   const user_id = token.user.id
  //   // console.log(user_id)
  //   setUserToken(token)

  //   // set questions answered from localstorage

  //   setQuestionsAnswered(
  //     JSON.parse(localStorage.getItem("questions_answered")) || []
  //   )

  //   // Fetch user details
  //   setIsLoading(true)
  //   axios
  //     .get(`${API_URL}/user/details?user_id=${user_id}`)
  //     .then((res) => {
  //       console.log(res.data)
  //       setCurrentUserDetails(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       toast.error(err.response.data.message)
  //     })

  //   // Fetch riddles
  //   axios
  //     .get(`${API_URL}/riddle/question`)
  //     .then((res) => {
  //       // console.log(res.data)
  //       setRiddlesData(res.data)

  //       console.log("IMP")
  //       console.log(currentUserDetails)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       toast.error(err.response.data.message)
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  // }, [])

  // console.log(currentUserDetails)

  const handlePreviousClick = () => {
    setActiveRiddleIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    // setUserAnswer("")
    // setShowMessage(false)
  }

  const handleNextClick = () => {
    // if (
    //   userAnswer.toLowerCase() ===
    //   riddlesData[activeRiddleIndex].answer.toLowerCase()
    // ) {
    //   setActiveRiddleIndex((prevIndex) =>
    //     Math.min(prevIndex + 1, riddlesData.length - 1)
    //   )
    //   setUserAnswer("")
    //   // setShowMessage(false)
    // } else {
    //   // setShowMessage(true)
    // }
    setActiveRiddleIndex((prevIndex) =>
      Math.min(prevIndex + 1, riddlesData.length - 1)
    )
  }

  // check button disabled or not for every question
  useEffect(() => {
    // console.log("Active riddle index changed")
    checkNextButtonDisabled()
  }, [activeRiddleIndex, currentUserDetails, riddlesData])

  const [availabeScore, setAvailableScore] = useState(10)
  // const [scoreDeduction, setScoreDeduction] = useState(0)

  // Calculate score
  const calculateScore = () => {
    const current_riddle = riddlesData[activeRiddleIndex]
    // console.log("Current riddle: ", current_riddle)
    // console.log("Active riddle index: ", activeRiddleIndex)

    const todays_date = new Date()
    todays_date.setHours(0, 0, 0, 0)

    const riddle_date = new Date(current_riddle?.date)
    riddle_date.setHours(0, 0, 0, 0)

    // Time difference in milliseconds
    const time_difference = Math.abs(todays_date - riddle_date)
    console.log("Time difference: ", time_difference)

    // Convert time difference to days
    let time_difference_in_days = Math.floor(
      time_difference / (1000 * 3600 * 24)
    )
    console.log("Time difference in days: ", time_difference_in_days)

    let scoreDeduction = 0

    // TODO: Just finalise the score deduction logic after discussion from mind ripple
    if (time_difference_in_days > 10) {
      console.log("Score deduction: ", 8)
      // setScoreDeduction(8)
      scoreDeduction = 8
    } else if (time_difference_in_days > 8) {
      console.log("Score deduction: ", 6)
      // setScoreDeduction(6)
      scoreDeduction = 6
    } else if (time_difference_in_days > 6) {
      console.log("Score deduction: ", 4)
      // setScoreDeduction(4)
      scoreDeduction = 4
    } else if (time_difference_in_days > 4) {
      console.log("Score deduction: ", 2)
      // setScoreDeduction(2)
      scoreDeduction = 2
    } else if (time_difference_in_days > 0) {
      console.log("Score deduction: ", 1)
      // setScoreDeduction(1)
      scoreDeduction = 1
    }

    const final_score = availabeScore - scoreDeduction
    console.log("Final score: ", final_score)

    return final_score
  }

  const [timeDifference, setTimeDifference] = useState(null)
  console.log("Time difference: ", timeDifference)
  // calculate time difference between current date and next riddle date
  const calculateTimeDifference = () => {
    const current_riddle = riddlesData[activeRiddleIndex]

    const todays_date = new Date()
    todays_date.setHours(0, 0, 0, 0)

    const riddle_date = new Date(current_riddle?.date)
    riddle_date.setHours(0, 0, 0, 0)

    // Time difference in milliseconds
    const time_difference = Math.abs(todays_date - riddle_date)

    return time_difference
  }

  useEffect(() => {
    console.log("Active riddle index changed")
    const time_difference = calculateTimeDifference()

    setTimeDifference(time_difference)
  }, [activeRiddleIndex, riddlesData])

  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false)

  const handleAnswerSubmission = () => {
    // console.log("All riddles: ")
    // console.log(riddlesData)

    // console.log("User answer: ", currentAnswer)

    // setAvailableScore(calculateScore())

    // console.log("User token: ")
    // console.log(userToken)

    if (currentAnswer == "") {
      toast.error("Please enter an answer")
      return
    }

    const final_score = calculateScore()
    console.log("Score: ", final_score)

    // Fire request to backend to check answer
    setIsSubmittingAnswer(true)
    axios
      .get(
        `${API_URL}/riddle/checkanswer?riddle_id=${riddlesData[activeRiddleIndex].riddle_id}&answer=${currentAnswer}&score=${final_score}&email=${userToken.user.email}`
      )
      .then((res) => {
        console.log(res.data)
        toast.success(res.data.msg)

        // Increment user score
        setCurrentUserDetails((prevDetails) => {
          return {
            ...prevDetails,
            scores: prevDetails.scores + final_score,
            solved_questions: [
              ...prevDetails.solved_questions,
              riddlesData[activeRiddleIndex].riddle_id.toString(),
            ],
          }
        })

        const questions_answered_local = [
          ...questionsAnswered,
          {
            riddle_id: riddlesData[activeRiddleIndex].riddle_id.toString(),
            answer: currentAnswer,
          },
        ]

        console.log("Questions answered local: ")
        console.log(questions_answered_local)

        // Set questions answered
        setQuestionsAnswered(questions_answered_local)

        // Store questions answered in local storage
        localStorage.setItem(
          "questions_answered",
          JSON.stringify(questions_answered_local)
        )

        console.log("Next button should be enabled now")
        // Enable next button
        setIsNextButtonDisabled(false)

        setCurrentAnswer("")

        // Increment active riddle index
        setActiveRiddleIndex((prevIndex) =>
          Math.min(prevIndex + 1, riddlesData.length - 1)
        )

        // set time difference for next riddle
        setTimeDifference(0)
      })
      .catch((err) => {
        console.log(err)

        if (err.response?.status == 400) {
          toast.error(err.response.data.message, {
            duration: 5000,
          })
          setShowMessage(true)
        } else if (err.response?.status == 500) {
          toast.error("Internal server error")
        }
      })
      .finally(() => {
        setIsSubmittingAnswer(false)
      })
  }

  if (isLoading) {
    return (
      <div className={` ${roboto.className} bg-matrixBlack z-999`}>
        <NavBar />
        <div className="h-[80vh] w-full flex flex-col items-center justify-center">
          <MoonLoader color="#ffffff" size={70} />
          <h1 className="text-yellow-500 text-2xl font-semibold ml-2 mt-4">
            Loading...
          </h1>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* <div className="overflow-y-hidden">
        <Confetti height={1000} />
      </div> */}
      <div className={` ${roboto.className}`}>
        <NavBar />
        <div className="flex flex-col md:flex-row justify-between px-6 m-auto md:mt-5 md:px-8">
          <p
            className={`${oswald.className} text-custom-yellow text-3xl md:text-5xl font-semibold`}
          >
            RIDDLES N PUZZLES
          </p>
          <div className="mt-3 flex flex-row-reverse justify-between md:flex-col text-lg md:text-2xl md:justify-end md:px-7">
            <p className="font-semibold  text-custom-green flex flex-row">
              Answered:
              <span className="text-custom-grey flex-row ml-2">
                {currentUserDetails?.solved_questions == null
                  ? 0
                  : currentUserDetails.solved_questions.length}{" "}
                / {riddlesData.length}
              </span>
            </p>
            <p className="font-semibold  text-custom-green flex flex-row md:justify-end">
              Your Score:{" "}
              <span className="text-custom-grey flex-row ml-2">
                {currentUserDetails?.scores}
              </span>
            </p>
          </div>
        </div>

        <div className="px-6 mt-7 md:mt-12">
          <h1 className="text-custom-green font-semibold text-3xl md:text-5xl md:text-center mb-4 font-roboto md:mb-0">
            Active Riddle
          </h1>
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        {/* Button and question */}
        <div className="flex flex-row items-center justify-center  md:p-6 md:w-4/5 md:mx-auto">
          <button
            className={`text-custom-grey bg-custom-1E1E1E rounded-full  items-center justify-center   py-3 px-4 md:flex hidden hover:bg-custom-121212 duration-300
              ${activeRiddleIndex == 0 ? "md:invisible" : ""}
              `}
            onClick={handlePreviousClick}
          >
            <BiSolidChevronLeft className="text-4xl -ml-1" />
          </button>
          <div
            className="px-6 flex flex-col justify-normal  md:items-center md:justify-center
          md:w-full
          "
          >
            {/* <p className="text-green-500 font-semibold text-2xl md:text-3xl mb-4 font-roboto ">
              Active Riddle
            </p> */}
            <p
              className="text-custom-grey text-justify font-normal text-lg justify-normal  md:items-center md:justify-center md:w-4/5 text-[20px] md:text-center
            md:text-2xl
            "
            >
              {riddlesData[activeRiddleIndex]?.question}
            </p>
          </div>

          <button
            className={`text-custom-grey bg-custom-1E1E1E rounded-full  items-center justify-center hidden md:flex py-3 px-4

              ${activeRiddleIndex == riddlesData.length - 1 ? "invisible" : ""}

              ${
                isNextButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-custom-121212 duration-300"
              }
              `}
            onClick={handleNextClick}
            disabled={isNextButtonDisabled}
          >
            <BiSolidChevronRight className="text-4xl" />
          </button>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        <div className="px-6 mt-5 md:mt-3 flex md:flex-col flex-row justify-between md:items-center md:justify-center gap-2 items-center sm:justify-normal">
          <div className="text-center flex flex-row md:flex-col md:pl-10">
            {currentUserDetails?.solved_questions?.includes(
              riddlesData[activeRiddleIndex]?.riddle_id.toString()
            ) ? (
              <>
                {questionsAnswered && (
                  <p className="text-custom-grey text-2xl font-medium md:text-3xl">
                    Answer: {questionsAnswered[activeRiddleIndex]?.answer}
                  </p>
                )}
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  className="md:mt-6 text-custom-grey font-semibold text-base md:text-center bg-transparent border-b border-gray-500 outline-none md:w-[502px]
                  placeholder:text-custom-dark-grey w-full md:text-2xl
    
                  "
                  placeholder="Enter your answer"
                />

                {/* //! TODO: Uncomment this once CSS gets finalized */}
                {/* {showMessage && (
                  <p className="text-red-500 mt-2">Wrong answer! Try again.</p>
                )} */}
              </>
            )}
          </div>
          <div className="flex flex-row md:flex-col md:ml-4 ">
            {currentUserDetails?.solved_questions?.includes(
              riddlesData[activeRiddleIndex]?.riddle_id.toString()
            ) ? (
              <>
                <button
                  className="border flex flex-col md:flex-row border-yellow-500 text-black justify-center items-center rounded-md font-semibold md:text-2xl lg:mt-4 md:ml-3  px-2 py-1 md:px-3 md:mt-2
                 opacity-50 cursor-not-allowed bg-yellow-500 text-xl
                "
                  onClick={handleAnswerSubmission}
                  disabled={true}
                >
                  Submitted
                </button>
              </>
            ) : (
              <button
                className={`border flex flex-col md:flex-row  justify-center items-center rounded-lg  font-semibold text-lg md:text-2xl md:mt-4 md:ml-3
                px-2 md:px-4 md:py-2 py-1 
                 ${
                   isSubmittingAnswer
                     ? "opacity-50 cursor-not-allowed border-custom-yellow"
                     : "hover:bg-green-500 hover:text-black hover:font-bold duration-300 border-custom-green text-custom-green"
                 }
                 `}
                onClick={handleAnswerSubmission}
                disabled={isSubmittingAnswer}
              >
                {isSubmittingAnswer ? (
                  <div className="flex justify-center items-center md:px-4">
                    <p className="md:mr-2 text-yellow-500">Submitting</p>
                    <div className="hidden md:flex ">
                      <MoonLoader
                        size={20}
                        color={"#CA8A04"}
                        loading={isSubmittingAnswer}
                      />
                    </div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Wrong answer indicator */}
        <div className="mt-3 text-center px-6">
          {showMessage && (
            <p className="text-red-500 mt-2">Wrong answer! Try again.</p>
          )}
        </div>

        {/* Button for mobile devices */}
        <div className="w-full flex justify-between sm:justify-normal sm:gap-5 p-6 md:hidden">
          {activeRiddleIndex != 0 && (
            <button
              className="w-[122px] h-[50px] text-custom-grey font-semibold text-lg bg-custom-1E1E1E rounded-lg px-2 py-2"
              onClick={handlePreviousClick}
            >
              Previous
            </button>
          )}

          {activeRiddleIndex != riddlesData.length - 1 && (
            <button
              className="font-semibold text-lg text-custom-grey bg-custom-1E1E1E rounded-lg px-2 py-2 w-[122px] h-[50px]"
              onClick={handleNextClick}
            >
              Next
            </button>
          )}
        </div>

        {timeDifference && (
          <MemoizedCountdownTimer timeDifference={timeDifference} />
        )}
      </div>
    </>
  )
}

export default Riddles
