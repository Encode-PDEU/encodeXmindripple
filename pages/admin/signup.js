import Link from "next/link"
import axios from "axios"
import { ReactMatrixAnimation } from "react-matrix-animation"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Logos from "@/components/logos"
import { Oswald, Roboto } from "next/font/google"
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

const Signup = () => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // For checking if the window is resized
  useEffect(() => {
    // Check if user has already logged in
    if (localStorage.getItem("admin_token")) {
      router.replace("/admin/questions/all")
    }

    // Check if the window width is less than a certain value (e.g., 768 for mobile)
    // const checkIsMobile = () => {
    //   setIsMobile(window.innerWidth < 748)
    // }

    // // Initial check
    // checkIsMobile()

    // // Add a listener for window resize
    // window.addEventListener("resize", checkIsMobile)

    // // Clean up the listener when the component is unmounted
    // return () => {
    //   window.removeEventListener("resize", checkIsMobile)
    // }
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = (event) => {
    event.preventDefault()

    if (email == "" || password == "") {
      toast.error("Please enter all the fields", {
        position: "top-center",
        autoClose: 2000,
      })
      return
    }
    // console.log(email == "mindripple@gmail.com")

    if (
      email == "encode_pdeu@gmail.com" ||
      email == "mindripple@gmail.com" ||
      email == "ayush.cict21@sot.pdpu.ac.in"
    ) {
      setIsLoading(true)
      axios
        .post(`${API_URL}/admin/signup`, { email: email, password: password })
        .then((res) => {
          // console.log(res.data)
          localStorage.setItem("admin_token", JSON.stringify(res.data))
          toast.success("Signup  Successfull !!", {
            position: "bottom-right",
            // autoClose: 2000,
          })
          router.replace("/admin/questions/all")
        })
        .catch((err) => {
          console.log(err)
          toast.error("Signup failed. Try again.", {
            position: "bottom-right",
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      toast.error("You are not allowed to login", {
        position: "top-center",
        autoClose: 2000,
      })
      return
    }
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
                SIGNUP
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
                    <p>Already have an account?</p>
                  </div>
                  <div>
                    <Link
                      href="/admin/login"
                      className=" align-baseline font-normal md:text-xl text-lg text-custom-grey underline"
                    >
                      Login
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
                    onClick={handleSignup}
                    disabled={isLoading}
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
      </div>
    </>
  )
}

export default Signup
