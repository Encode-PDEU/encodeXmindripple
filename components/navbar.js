import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import { toast, ToastContainer } from "react-toastify"

const NavBar = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")
    const { error } = supabase.auth.signOut()
    if (error) console.log("Error logging out:", error.message)
    else {
      // This toast is not working
      toast.success("Logged out Successfully!!", {
        position: "bottom-right",
      })
      router.replace("/login")
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="relative">
        <div
          className={`fixed top-0 left-0 h-full w-full bg-black z-20 transition-opacity ${
            isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
        ></div>

        {/* Hamburger icon */}
        <div className="flex items-center md:hidden p-8 absolute top-0 right-0">
          <button onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 text-custom-yellow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/*Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full bg-black w-full bg-opacity-20 backdrop-blur-md z-30 transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className={`md:flex md:flex-row md:text-center text-center items-center md:items-center ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="md:flex md:items-center mt-20 md:flex-row md:justify-center md:gap-x-8 p-20">
              <Link href="/riddles">
                <div
                  className={`link-style pb-6 mt-10 text-2xl ${
                    router.pathname === "/riddles"
                      ? "text-custom-green"
                      : "text-custom-yellow"
                  }`}
                >
                  Riddles
                </div>
              </Link>

              <Link href="/leaderboard">
                <div
                  className={`link-style pb-6 text-2xl ${
                    router.pathname === "/leaderboard"
                      ? "text-custom-green"
                      : "text-custom-yellow"
                  }`}
                >
                  Leaderboard
                </div>
              </Link>

              <Link href="/participants">
                <div
                  className={`link-style text-2xl ${
                    router.pathname === "/participants"
                      ? "text-custom-green"
                      : "text-custom-yellow"
                  }`}
                >
                  All Participants
                </div>
              </Link>
            </div>
            <div
              className={`md:flex md:flex-row  md:items-center md:justify-center pb-30 ${
                isMenuOpen ? "block" : "hidden"
              }`}
            >
              <button
                className="md:border md:border-custom-yellow text-custom-yellow md:px-4 md:py-2 m-[-30px] items-center text-center rounded-lg text-2xl "
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="flex items-center md:hidden p-8 absolute top-0 right-0">
            <button onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-custom-yellow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between px-6 pt-8 pb-6">
            <div className="flex items-center gap-x-4">
              <div className="flex flex-row items-end gap-x-4 md:h-[40px] md:w-[50px]">
                <Image
                  src="/Images/mindripple_logo.png"
                  alt="MindRipple Logo"
                  width={500}
                  height={500}
                  className="h-[40px] w-[45px] md:h-[45px] md:w-[50px]"
                />
                <h1 className="font-bold text-2xl uppercase text-custom-yellow">
                  x
                </h1>
                <Image
                  src="/Images/Encode_Logo.png"
                  alt="Encode Logo"
                  width={500}
                  height={500}
                  className="h-[37px] w-[45px] md:h-[42px] md:w-[50px]"
                />
              </div>
            </div>
            <div
              className={`md:flex md:items-center md:flex-row md:justify-center md:gap-x-8 md:ml-28  ${
                isMenuOpen ? "hidden" : "hidden"
              }`}
            >
              <Link href="/riddles">
                <div
                  className={`link-style text-2xl hover ${
                    router.pathname === "/riddles"
                      ? "text-custom-green font-medium"
                      : "text-custom-yellow hover:text-custom-green hover:duration-300"
                  }`}
                >
                  Riddles
                </div>
              </Link>

              <Link href="/leaderboard">
                <div
                  className={`link-style text-2xl ${
                    router.pathname === "/leaderboard"
                      ? "text-custom-green font-medium"
                      : "text-custom-yellow hover:text-custom-green duration-300"
                  }`}
                >
                  Leaderboard
                </div>
              </Link>

              <Link href="/participants">
                <div
                  className={`link-style text-2xl ${
                    router.pathname === "/participants"
                      ? "text-custom-green"
                      : "text-custom-yellow hover:text-custom-green"
                  }`}
                >
                  All Participants
                </div>
              </Link>
            </div>
            <div
              className={`md:flex md:flex-row flex flex-row md:pl-8 ${
                isMenuOpen ? "hidden" : "hidden"
              }`}
            >
              <button
                className="md:border md:border-custom-yellow text-custom-yellow md:px-4 md:py-2 items-center text-center rounded-lg text-xl "
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
