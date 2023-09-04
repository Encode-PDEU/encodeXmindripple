import Link from "next/link";
import axios from "axios";
import { ReactMatrixAnimation } from "react-matrix-animation";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logos from "./components/logos";
import { Oswald, Roboto } from '@next/font/google';
const oswald = Oswald({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
  });

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL
const Signup = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the window width is less than a certain value (e.g., 768 for mobile)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 748);
    };

    // Initial check
    checkIsMobile();

    // Add a listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent the form from submitting
    // Add your signup logic here if needed
    router.push("/riddles"); // Direct to the riddles page
  };
  return (
    <div className={` ${roboto.className} flex flex-col md:flex-row h-full`}>

      {isMobile && <ReactMatrixAnimation />}
      <div className="md:w-[50%] bg-black p-6">
        <Logos />
      </div>
      <div className="md:w-[50%] bg-custom-161616">

        <div className="flex flex-col md:items-center  p-6 ">
          <h1 className={` ${oswald.className} text-green-600 font-semibold justify-center items-center text-3xl mb-4 mt-6 `}>SIGNUP</h1>
          <form className="flex flex-col">

            <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3'>
              <div className="flex flex-col"> {/* Container for Name */}
                <label className="text-white text-2xl font-normal mb-2 items-baseline" htmlFor="Name">
                  Name
                </label>
                <input className="border rounded-lg py-2 px-3 text-gray-500 bg-opacity-0 bg-black mb-5 mt-1 md:w-[250px] md:h-[55px]" id="Name" placeholder="Enter your Name" required/>
              </div>

              <div className="flex flex-col"> {/* Container for Roll No */}
                <label className="text-white text-2xl font-normal mb-2 items-baseline " htmlFor="RollNo">
                  Roll No
                </label>
                <input
                  className="border rounded-lg py-2 px-3 text-gray-500 bg-opacity-0 bg-black mb-5 mt-1 md:w-[250px] md:h-[55px]" id="RollNo" placeholder="Enter your Roll Number" required/>
              </div>
            </div>

            <label className="text-white text-2xl font-normal mb-2 pt-3" htmlFor="Contact">
              Contact
            </label>
            <input className="border rounded-lg py-2 px-3 text-gray-500 bg-opacity-0 bg-black mb-5 mt-1" id="Contact" placeholder="Enter your Contact Number" required></input>

            <label className="text-white text-2xl font-normal mb-2" htmlFor="Email">
              Email
            </label>
            <input className="border rounded-lg py-2 px-3 text-gray-500 bg-opacity-0 bg-black mb-5 mt-1" id="Email" placeholder="Enter your Email" required></input>

            <label className="text-white text-2xl font-normal" htmlFor="password">
              Password
            </label>
            <input className="border rounded-lg py-2 px-3 text-gray-500 bg-opacity-0 bg-black p-4 mb-5 mt-1 " id="password" type="password" placeholder="Enter Password" required></input>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-white text-xl font-normal" type="button">
                Already have an account?
                <Link href="/login" className="inline-block align-baseline font-normal text-xl md:ml-60 ml-10">
                  Login
                </Link>
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="inline-block align-baseline font-semibold text-2xl bg-yellow-500 w-[350px] h-[50px] rounded py-2 px-4 text-black transition ease-linear duration-300  "
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
