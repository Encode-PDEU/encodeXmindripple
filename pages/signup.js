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

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const API_URL = process.env.NEXT_PUBLIC_API_URL

const Signup = () => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // For checking if the window is resized
  useEffect(() => {
    // Check if user has already logged in
    if (localStorage.getItem("token")) {
      router.replace("/riddles")
    }

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
        console.log(res.data)
        localStorage.setItem("token", JSON.stringify(res.data))
        toast.success("Signup  Successfull !!", {
          position: "bottom-right",
          // autoClose: 2000,
        })
        router.replace("/riddles")
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
  }
  return (
    <>
      <div className={` ${roboto.className} flex flex-col md:flex-row h-full`}>
        {isMobile && <ReactMatrixAnimation />}
        <div className="md:w-[50%] bg-black p-6">
          <Logos />
        </div>
        <div className="md:w-[50%] bg-custom-161616">
          <div className="flex flex-col md:items-center  p-6 ">
            <h1
              className={` ${oswald.className} text-green-600 font-semibold justify-center items-center text-3xl mb-4 mt-6 `}
            >
              SIGNUP
            </h1>
            <form className="flex flex-col">
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <div className="flex flex-col">
                  {/* Container for Name */}
                  <label
                    className="text-white text-2xl font-normal mb-2 items-baseline"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="border rounded-lg py-2 px-3 bg-opacity-0 bg-black mb-5 mt-1 md:w-[250px] md:h-[55px] text-white"
                    id="name"
                    name="name"
                    placeholder="Enter your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  {/* Container for Roll No */}
                  <label
                    className="text-white text-2xl font-normal mb-2 items-baseline "
                    htmlFor="rollNo"
                  >
                    Roll No
                  </label>
                  <input
                    className="border rounded-lg py-2 px-3 text-white bg-opacity-0 bg-black mb-5 mt-1 md:w-[250px] md:h-[55px]"
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
                className="text-white text-2xl font-normal mb-2 pt-3"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                className="border rounded-lg w-full py-2 px-3 text-white bg-opacity-0 bg-black mb-5 mt-1"
                id="contact"
                name="contact"
                placeholder="Enter your Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
              ></input>

              <label
                className="text-white text-2xl font-normal mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border rounded-lg w-full py-2 px-3 text-white bg-opacity-0 bg-black mb-5 mt-1"
                id="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label
                className="text-white text-2xl font-normal"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border rounded-lg w-full py-2 px-3 text-white bg-opacity-0 bg-black p-4 mb-5 mt-1 "
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="flex flex-row items-center justify-between">
                <div className="">
                  <p>Already have an account</p>
                </div>
                <div>
                  <Link
                    href="/login"
                    className=" align-baseline font-normal text-lg "
                  >
                    Login
                  </Link>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className={`"inline-block align-baseline font-semibold text-2xl bg-yellow-500 w-[350px] h-[50px] rounded py-2 px-4 text-black"
                onClick={handleSignup
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
