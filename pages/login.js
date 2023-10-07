import React, { useState, useEffect, CSSProperties } from "react"
import { useRouter } from "next/router"
import Logos from "@/components/logos"
// import Layout from "../app/layout"
import { ReactMatrixAnimation } from "react-matrix-animation"
import { Oswald, Roboto } from "next/font/google"
import axios from "axios"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { MoonLoader } from "react-spinners"
import Image from "next/image"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

const Login = () => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // Check if the window is resized
  useEffect(() => {
    // Check if the window width is less than a certain value (e.g., 768 for mobile)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 748)
    }

    // Initial check
    checkIsMobile()

    // Add a listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (event) => {
    event.preventDefault()
    console.log("clicked")

    if (email == "" || password == "") {
      toast.error("Please enter all the fields", {
        position: "top-center",
      })
      return
    }

    setIsLoading(true)
    axios
      .post(`${API_URL}/user/login`, { email: email, password: password })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("token", JSON.stringify(res.data))
        toast.success("Logged in Successfully!!", {
          position: "bottom-right",
        })
        router.replace("/riddles") // Use replace instead of push so that the user can't go back to the login page
      })
      .catch((err) => {
        console.log("Browser login error")
        console.log(err)

        // If the error is 401, then the user entered the wrong credentials
        if (err.response?.status == 401) {
          toast.error("Invalid credentials. Try again", {
            position: "top-center",
          })
          return
        } else if (err.response?.status == 500) {
          // If the error is 500, then there was an error with the server
          toast.error("Unable to log in. Try again", {
            position: "top-center",
          })
          return
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div
        className={` ${roboto.className} flex lg:h-screen flex-col space-y-8 align-middle justify-center mt-8 lg:mt-0`}
      >
        {/* {isMobile && <ReactMatrixAnimation />} */}
        <div className="flex flex-col lg:flex-row min-h-screen">
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
          <div className="lg:w-[55%] lg:bg-custom-161616 lg:h-screen">
            <div className="flex flex-col lg:items-center mt-3 p-6 lg:bg-custom-161616 md:mt-28 xl:mt-24">
              <h1
                className={`${oswald.className} text-custom-green text-center font-semibold justify-center items-center md:justify-center md:items-center text-5xl mb-4 mt-6 p-2 md:text-7xl lg:text-6xl`}
              >
                LOGIN
              </h1>
              <form className="flex flex-col w-full mt-6 sm:px-8 md:px-14">
                <label
                  className="text-custom-grey text-2xl md:text-3xl font-normal mb-2 items-baseline"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  className="border rounded-lg w-full py-2 px-3 text-custom-grey bg-opacity-0 bg-black mb-5 md:text-2xl mt-1 placeholder:text-custom-dark-grey border-custom-dark-grey
                  focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent
                  "
                  id="Email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label
                  className="text-custom-grey text-2xl md:text-3xl font-normal md:mt-3"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border rounded-lg md:mt-2 w-full py-2 px-3 text-custom-grey bg-opacity-0 bg-black p-4 mb-5 mt-1 md:text-2xl placeholder:text-custom-dark-grey border-custom-dark-grey
                  focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent
                  "
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex flex-row items-center justify-between">
                  <div className="text-custom-grey md:text-xl">
                    <p>Do not have an account?</p>
                  </div>
                  <div>
                    <Link
                      href="/signup"
                      className=" align-baseline font-normal md:text-xl text-lg text-custom-grey underline"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className={`inline-block align-baseline font-semibold text-2xl bg-custom-yellow w-[350px] h-[50px] rounded py-2 px-4 text-black md:text-3xl
                      ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-yellow-600"
                      }
                      `}
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center">
                        <p className="mr-2">Logging in</p>
                        <MoonLoader
                          size={20}
                          color={"#000000"}
                          loading={isLoading}
                        />
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
