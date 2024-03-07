import Link from "next/link"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Logos from "@/components/logos"
import { Oswald, Roboto } from "next/font/google"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { MoonLoader } from "react-spinners"
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

const API_URL = process.env.NEXT_PUBLIC_API_URL //|| //"http://localhost:3000/api"

const Signup = () => {
  const router = useRouter()

  // For checking if the window is resized
  useEffect(() => {
    // Check if user has already logged in
    if (localStorage.getItem("token")) {
      router.replace("/riddles")
    }
    // }
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    contact: "",
    email: "",
    password: "",
  })
  // console.log(formData)

  const handleChange = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = (event) => {
    event.preventDefault()

    if (Object.values(formData).some((value) => value === "")) {
      toast.warn("Please fill all the fields", {
        position: "bottom-right",
      })
      return
    }

    setIsLoading(true)
    axios
      .post(`${API_URL}/user/signup`, formData)
      .then((res) => {
        // console.log(res.data)
        localStorage.setItem("token", JSON.stringify(res.data))
        toast.success("Signup  Successfull !!", {
          position: "bottom-right",
          // autoClose: 2000,
        })
        router.replace("/riddles")
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.error, {
          position: "bottom-right",
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <>
      <div
        className={` ${roboto.className} flex flex-col lg:flex-row h-full mt-8 lg:mt-0`}
      >
        <Head>
          <title>MindRipple X Encode | Login</title>
          <meta
            name="description"
            content="
            Encode x MindRipple Surf Quest 1.0 . Surf through the riddles and solve them to win exciting prizes.
          "
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="lg:w-[45%]  px-6 pt-8 lg:pt-0">
          {/* Below div is only for mobile screens */}
          <div className="flex flex-row items-end flex-wrap gap-x-4 justify-center lg:hidden">
            <Image
              src="/Images/mindripple_logo.png"
              alt="MindRipple Logo"
              width={500}
              height={500}
              className="h-[65px] w-[75px] sm:h-[70px] sm:w-[80px] md:h-[90px] md:w-[100px]"
            />
            <h1 className="text-custom-yellow font-semibold text-3xl uppercase sm:text-4xl">
              X
            </h1>
            <Image
              src="/Images/Encode_Logo.png"
              alt="Encode Logo"
              width={500}
              height={500}
              className="h-16 w-20 sm:h-[68px] sm:w-[85px] md:h-[85px] md:w-[110px]"
            />
          </div>

          {/* For desktop screens */}
          <Logos />
        </div>

        <div className="lg:w-[55%] lg:bg-custom-161616">
          <div className="flex flex-col lg:items-center  p-6 md:px-20 lg:px-14 lg:mt-10 xl:mt-0">
            <h1
              className={`${oswald.className} text-custom-green text-center font-semibold justify-center items-center md:justify-center md:items-center text-5xl tmb-4 mt-6 p-2 lg:text-7xl`}
            >
              SIGNUP
            </h1>
            <form className="flex flex-col lg:mt-8 lg:w-full">
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:justify-between">
                <div className="flex flex-col md:w-full">
                  {/* Container for Name */}
                  <label
                    className="text-custom-grey text-2xl font-normal mb-2 items-baseline"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="border rounded-lg py-2 px-3 bg-opacity-0 bg-black mb-5 mt-1 md:h-[55px] text-custom-grey
                    placeholder:text-custom-dark-grey border-custom-dark-grey
                    focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent
                    md:w-full
                    text-lg
                    "
                    id="name"
                    name="name"
                    placeholder="Enter your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col md:w-full">
                  {/* Container for Roll No */}
                  <label
                    className="text-custom-grey text-2xl font-normal mb-2 items-baseline "
                    htmlFor="rollNo"
                  >
                    Roll No
                  </label>
                  <input
                    className="border rounded-lg py-2 px-3  mb-5 mt-1 md:h-[55px]
                    text-custom-grey
                    placeholder:text-custom-dark-grey border-custom-dark-grey
                    focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent
                    bg-transparent
                    md:w-full
                    text-lg
                    "
                    id="rollNo"
                    name="rollNo"
                    placeholder="Enter your Roll Number"
                    value={formData.rollNo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label
                className="text-custom-grey text-2xl font-normal mb-2 pt-3"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                className="border rounded-lg w-full py-2 px-3 bg-transparent mb-5 mt-1
                text-custom-grey
                    placeholder:text-custom-dark-grey border-custom-dark-grey
                    focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent
                    text-lg
                "
                id="contact"
                name="contact"
                placeholder="Enter your Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
              ></input>

              <label
                className="text-custom-grey text-2xl font-normal mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border rounded-lg w-full py-2 px-3  bg-transparent mb-5 mt-1
                text-custom-grey
                    placeholder:text-custom-dark-grey border-custom-dark-grey
                    focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent
                    text-lg
                "
                id="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label
                className="text-custom-grey text-2xl font-normal"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border rounded-lg w-full py-2 px-3 bg-transparent p-4 mb-5 mt-1 text-custom-grey
                placeholder:text-custom-dark-grey border-custom-dark-grey
                focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent
                text-lg"
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="flex flex-row items-center justify-between">
                <div className="text-custom-grey text-lg">
                  <p>Already have an account?</p>
                </div>
                <div>
                  <Link
                    href="/login"
                    className=" align-baseline font-normal text-lg text-custom-grey underline"
                  >
                    Login
                  </Link>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className={`inline-block align-baseline font-semibold text-2xl bg-custom-yellow w-[350px] h-[50px] rounded-md py-2 px-4 text-black
                  ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-yellow-600"
                  }
                  `}
                  disabled={isLoading}
                  onClick={handleSignup}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <p className="mr-2">Signing up</p>
                      <MoonLoader
                        size={20}
                        color={"#000000"}
                        loading={isLoading}
                      />
                    </div>
                  ) : (
                    "Signup"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup