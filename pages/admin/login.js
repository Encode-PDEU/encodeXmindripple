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
      .post(`${API_URL}/admin/login`, { email: email, password: password })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("admin_token", JSON.stringify(res.data))
        toast.success("Logged in Successfully!!", {
          position: "bottom-right",
        })
        router.replace("/admin/questions/post") // Use replace instead of push so that the user can't go back to the login page
      })
      .catch((err) => {
        console.log("Browser login error")
        console.log(err)

        // If the error is 401, then the user entered the wrong credentials
        if (err.response.status == 401) {
          toast.error("Invalid credentials. Try again", {
            position: "top-center",
          })
          return
        } else if (err.response.status == 500) {
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
        className={` ${roboto.className} flex md:h-screen flex-col  space-y-8 align-middle justify-center`}
      >
        {isMobile && <ReactMatrixAnimation />}
        <div className="relative h-screen bg-matrixBlack">
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-[50%]  p-6 md:bg-black">
              <Logos />
              {/* //! NEED WAY TO SHOW THIS IS ADMIN PANEL LOGIN */}
            </div>
            <div className="md:w-[50%] md:bg-custom-161616 h-screen pt-10 ">
              <div className="flex flex-col md:items-center p-6 bg-matrixBlack bg-custom-161616">
                <h1
                  className={`${oswald.className} text-green-600 font-semibold justify-center items-center md:justify-center md:items-center text-5xl mb-4 mt-6 p-2 `}
                >
                  LOGIN
                </h1>
                <form className="flex flex-col w-full">
                  <label
                    className="text-white text-2xl font-normal mb-2 items-baseline"
                    htmlFor="Email"
                  >
                    Email
                  </label>
                  <input
                    className="border rounded-lg w-full py-2 px-3 text-gray-500 bg-opacity-0 bg-black mb-5 mt-1"
                    id="Email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <label
                    className="text-white text-2xl font-normal"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border rounded-lg w-full py-2 px-3 text-gray-500 bg-opacity-0 bg-black p-4 mb-5 mt-1 "
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* <div className="flex flex-row items-center justify-between">
                    <div className="">
                      <p>Do not have an account</p>
                    </div>
                    <div>
                      <Link
                        href="/signup"
                        className=" align-baseline font-normal text-lg "
                      >
                        Sign up
                      </Link>
                    </div>
                  </div> */}
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className={`inline-block align-baseline font-semibold text-2xl bg-yellow-500 w-[350px] h-[50px] rounded py-2 px-4 text-black
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
      </div>
    </>
  )
}

export default Login
