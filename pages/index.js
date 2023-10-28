import React, { useEffect } from "react"
import { useRouter } from "next/router" // Import the useRouter hook
import { Oswald, Roboto } from "next/font/google"
import Image from "next/image"
import Head from "next/head"
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export default function App() {
  const router = useRouter() // Initialize the useRouter hook

  useEffect(() => {
    const token = localStorage.getItem("token")

    // Delay for 3 seconds before redirecting to the login page
    const timer = setTimeout(() => {
      if (token) {
        router.replace("/riddles")
      } else {
        router.replace("/login")
      }
    }, 3000)

    // Clear the timer if the component unmounts or changes before the delay is over
    return () => clearTimeout(timer)
  }, [])
  return (
    <div
      className={` ${roboto.className} flex h-screen flex-col justify-center items-center space-y-10 md:space-y-12`}
    >
      <Head>
        <title>MindRipple X Encode</title>
        <meta
          name="description"
          content="
          Encode x MindRipple Surf Quest 1.0 . Surf through the riddles and solve them to win exciting prizes.
        "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row items-center flex-wrap gap-x-4 justify-center">
        <Image
          src="/Images/mindripple_logo.png"
          width={500}
          height={500}
          alt="MindRipple Logo"
          className="
          h-20 w-24 sm:h-32 sm:w-36 md:h-[130px] md:w-[150px]"
        />
        <h1 className="text-custom-yellow font-semibold text-5xl uppercase sm:text-7xl">
          X
        </h1>
        <Image
          src="/Images/Encode_Logo.png"
          alt="Encode Logo"
          width={500}
          height={500}
          className="h-20 w-28 sm:h-[120px] sm:w-[150px]"
        />
      </div>
      <div
        className={`${oswald.className} flex flex-row font-semibold text-5xl sm:text-7xl `}
      >
        <p className="text-green-500">Surf</p>
        <p className="text-yellow-500">Quest</p>
        <p className="text-green-500 gap-x-2"> 1.0</p>
      </div>
      <div>
        <p className="text-custom-grey font-semibold text-3xl sm:text-5xl mb-5 font-roboto">
          MindRipple X Encode
        </p>
      </div>
    </div>
  )
}
