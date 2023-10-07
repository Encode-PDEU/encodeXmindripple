import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import NavBar from "../components/navbar"
import { getSession } from "next-auth/react"
import axios from "axios"
// import { ReactMatrixAnimation } from 'react-matrix-animation';
import { MoonLoader } from "react-spinners"

// const leaderboardData = [
//   { name: "Preet Sojitra", points: 2500, Solved: 50 },
//   { name: "Preet Sojitra", points: 2550, Solved: 45 },
//   { name: "Preet Sojitra", points: 2500, Solved: 40 },
//   { name: "Preet Sojitra", points: 2500, Solved: 35 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
//   { name: "Preet Sojitra", points: 2500, Solved: 30 },
// ]

const MobileMenu = ({ isOpen }) => {
  const router = useRouter()
  return <></>
}

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

const API_URL = "http://localhost:3000/api"

export default function Leaderboard_laptop() {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [topTen, setTopTen] = useState([])
  const [currentUserScore, setCurrentUserScore] = useState({})
  const [userEmail, setUserEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    console.log(token)

    const email = token.user.email
    console.log(email)

    setUserEmail(email)

    // setIsLoading(true)
    axios
      .get(`${API_URL}/leaderboard/all`)
      .then((res) => {
        console.log(res.data)
        setLeaderboardData(res.data.slice(0, 10))
        setTopTen(res.data.slice(0, 10))
        setCurrentUserScore({
          rank: res.data.findIndex((player) => player.email === email) + 1,
          ...res.data.filter((player) => player.email === email)[0],
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative">
      {isMobileMenuOpen ? null : <NavBar />}
      <h1
        className={`font-oswald font-semibold text-4xl md:text-6xl text-custom-yellow pl-4 md:pl-[40px] md:pt-[56px] md:pb-[56px] pt-4'} pb-4 md:pb-56`}
      >
        LEADERBOARD
      </h1>
      <>
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <MoonLoader color="#ffffff" />
          </div>
        ) : (
          <>
            <div className="w-full px-4 md:px-10">
              <table className="w-full border border-black">
                <thead>
                  <tr className="font-roboto md:text-2xl font-semibold text-center">
                    <th className="p-3 tracking-wide">Rank</th>
                    <th className="p-3 tracking-wide">Name</th>
                    <th className="p-3 tracking-wide">Points</th>
                    <th className="p-3 tracking-wide">Solved</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((player, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-custom rounded" : "bg-black"
                      } text-white`}
                    >
                      <td
                        className={`px-3 tracking-wide  font-roboto md:text-2xl font-medium rounded-s-lg p-4 align-middle text-center 
                ${
                  userEmail === player.email
                    ? "text-yellow-500"
                    : "text-custom-green"
                }
                `}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`px-3 tracking-wide  font-roboto md:text-2xl font-medium max-w-[200px] align-middle text-center
                ${
                  userEmail === player.email
                    ? "text-yellow-500"
                    : "text-custom-green"
                }
                `}
                      >
                        {player.name}
                      </td>
                      <td
                        className={`px-3 tracking-wide  font-roboto md:text-2xl font-medium align-middle text-center
                ${
                  userEmail === player.email
                    ? "text-yellow-500"
                    : "text-custom-green"
                }
                `}
                      >
                        {player.scores}
                      </td>
                      <td
                        className={`px-3  tracking-wide font-roboto md:text-2xl font-medium align-middle text-center
                  ${
                    userEmail === player.email
                      ? "text-yellow-500"
                      : "text-custom-green"
                  }
                  ${index % 2 === 0 ? "rounded-r-lg" : "rounded-s-lg"}`}
                      >
                        {player.solved_questions?.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Participant in sticky bar*/}

            {currentUserScore.rank > 10 && (
              <div className="fixed bottom-0 w-full">
                <div className="bg-custom p-3 md:p-5">
                  <div
                    className="p-2 md:p-4 md:flex md:flex-row md:items-center justify-between 
               bg-custom-161616"
                    // className={`p-2 md:p-4 md:flex md:flex-row md:items-center justify-between ${
                    //   index % 2 === 0 ? "bg-custom-161616" : "bg-black"
                    // }`}
                  >
                    <span className="text-custom-green font-roboto md:text-2xl font-medium text-center">
                      {currentUserScore.rank}
                    </span>
                    <span className="tracking-wide text-custom-green font-roboto md:text-2xl font-medium max-w-[200px] text-center">
                      {currentUserScore.name}
                    </span>
                    <span className="text-custom-green font-roboto md:text-2xl font-medium text-center">
                      {currentUserScore.scores}
                    </span>
                    <span
                      className="text-custom-green font-roboto md:text-2xl font-medium text-center rounded-s-lg"
                      // className={`text-custom-green font-roboto md:text-2xl font-medium text-center ${
                      //   index % 2 === 0 ? "rounded-r-lg" : "rounded-s-lg"
                      // }`}
                    >
                      {currentUserScore.solved_questions?.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    </div>
  )
}
