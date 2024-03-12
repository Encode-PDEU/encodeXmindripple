import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import NavBar from "../components/navbar"
import axios from "axios"
import { MoonLoader } from "react-spinners"
import { Oswald, Roboto } from "next/font/google"
import Head from "next/head"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export default function Page() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [allParticipants, setAllParticipants] = useState([])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    // console.log(token)

    if (!token) {
      router.replace("/login")
      return
    }

    setIsLoading(true)

    axios
      .get(`${API_URL}/participants/all`)
      .then((res) => {
        setAllParticipants(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className={` ${roboto.className} bg-matrixBlack z-999`}>
        <Head>
          <title>MindRipple X Encode | Leaderboard </title>
          <meta
            name="description"
            content="
          Encode x MindRipple Surf Quest 1.0 . Surf through the riddles and solve them to win exciting prizes.
        "
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
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
    <div className="pb-20">
      <Head>
        <title>MindRipple X Encode | Participants </title>
        <meta
          name="description"
          content="
          Encode x MindRipple Surf Quest 1.0 . Surf through the riddles and solve them to win exciting prizes.
            "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <h1
        className={`${oswald.className} font-semibold text-4xl md:text-6xl text-custom-yellow pl-4 md:pl-[40px] md:pt-[56px] md:pb-[25px] pt-4 pb-2`}
      >
        All Participants
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
                    <th className="p-3">Sr. No</th>
                    <th className="p-3">Name</th>
                    <th className="p-3 hidden sm:block">Email</th>
                    <th className="p-3">Roll No.</th>
                  </tr>
                </thead>
                <tbody>
                  {allParticipants.map((player, index) => (
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
                `}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`px-3 tracking-wide  font-roboto md:text-2xl font-medium max-w-[200px] align-middle text-center py-2
                `}
                      >
                        {player.name}
                      </td>
                      <td
                        className={`hidden sm:block px-3 tracking-wide  font-roboto md:text-2xl font-medium align-middle text-center
                `}
                      >
                        {player.email}
                      </td>
                      <td
                        className={`px-3 tracking-wide  font-roboto md:text-2xl font-medium align-middle text-center
                `}
                      >
                        {player.roll_no}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </>
    </div>
  )
}
