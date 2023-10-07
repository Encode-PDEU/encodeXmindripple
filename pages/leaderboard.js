import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import NavBar from "../components/navbar"
import { getSession } from "next-auth/react"
import axios from "axios"
// import { ReactMatrixAnimation } from 'react-matrix-animation';
import { MoonLoader } from "react-spinners"
import { Oswald, Roboto } from "next/font/google"

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

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

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
  const [currentUserScore, setCurrentUserScore] = useState([])
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
        setCurrentUserScore([
          {
            rank: res.data.findIndex((player) => player.email === email) + 1,
            ...res.data.filter((player) => player.email === email)[0],
          },
        ])
        // console.log({
        //   rank: res.data.findIndex((player) => player.email === email) + 1,
        //   ...res.data.filter((player) => player.email === email)[0],
        // })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="pb-20">
      <NavBar />
      <h1
        className={`${oswald.className} font-semibold text-4xl md:text-6xl text-custom-yellow pl-4 md:pl-[40px] md:pt-[56px] md:pb-[25px] pt-4 pb-2`}
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
            <div className="w-full px-2 md:px-10">
              <table
                className="w-full
              border-spacing-y-2 border-separate
              "
              >
                <thead>
                  <tr className="text-base md:text-2xl font-semibold text-center text-custom-grey">
                    <th className="p-3">Rank</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Points</th>
                    <th className="p-3">Solved</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((player, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "bg-custom-0F0F0F border rounded-md"
                          : "bg-transparent"
                      }`}
                    >
                      <td
                        className={`md:text-2xl  align-middle text-center 
                ${
                  userEmail === player.email
                    ? "text-custom-yellow"
                    : "text-custom-green"
                }
                `}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`px-3 tracking-wide  font-roboto md:text-2xl font-medium max-w-[200px] align-middle text-center py-2
                ${
                  userEmail === player.email
                    ? "text-custom-yellow"
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
                    ? "text-custom-yellow"
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
                      ? "text-custom-yellow"
                      : "text-custom-green"
                  } `}
                      >
                        {player.solved_questions?.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Participant in sticky bar*/}

            {currentUserScore[0].rank > 10 && (
              <div className="fixed bottom-0 w-full px-2 md:px-10">
                <div className="mb-4">
                  <div
                    className="py-2 md:flex md:flex-row md:items-center justify-between 
               bg-custom-161616"
                  >
                    <table className="w-full">
                      <tbody>
                        <tr>
                          {currentUserScore.map((player, index) => (
                            <>
                              <td
                                key={index}
                                className="text-custom-green font-roboto md:text-2xl font-medium text-center align-middle px-4 lg:px-[10px]"
                              >
                                {player.rank}
                              </td>
                              <td
                                className="text-custom-green font-roboto md:text-2xl font-medium text-center px-3
                              lg:px-3 w-[40%]
                              "
                              >
                                {/* {player.name} */}
                                Preet Sojitra
                              </td>
                              <td
                                className="text-custom-green tracking-wide font-roboto md:text-2xl font-medium text-center 
                             px-[14px] lg:px-1
                              "
                              >
                                {player.scores}
                              </td>
                              <td className="text-custom-green tracking-wide font-roboto md:text-2xl font-medium text-center px-3 lg:px-[14px] ">
                                {player.solved_questions?.length}
                              </td>
                            </>
                          ))}
                        </tr>
                      </tbody>
                    </table>

                    {/* <span className="text-custom-green font-roboto md:text-2xl font-medium text-center">
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
                    </span> */}
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
