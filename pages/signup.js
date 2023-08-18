import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent the form from submitting
    // Add your signup logic here if needed
    router.push("/riddles"); // Direct to the riddles page
  };
  return (
    <div className="flex flex-col font-oswald md:flex-row">

      <div className="flex md:h-screen flex-col  space-y-8 align-middle justify-center ">
        <div className="flex flex-row items-center flex-wrap gap-x-4 justify-center"> {/* Add flex-wrap and justify-center for mobile responsiveness */}
          <img src="/images/mindripple_logo.png" alt="MindRipple Logo" className="h-[100px] w-[101px]" />
          <img src="/images/X.png" alt="x" className="h-[80px] w-[44px]" />
          <img src="/images/Encode_Logo.png" alt="Encode Logo" className="h-[100px] w-[100px]" />
        </div>
        <div className="flex flex-row font-semibold text-5xl"> {/* Use different font size for mobile and larger screens */}
          <p className="text-green-500 font-oswald">Surf</p>
          <p className="text-yellow-500">Quest</p>
          <p className="text-green-500 gap-x-2"> 1.0</p>
        </div>
      </div>
      <div className="md:w-[50%]">

        <div className="flex flex-col md:items-center bg-custom-161616 ml-10 w-full ">
          <h1 className="text-green-600 font-semibold md:justify-center md:items-center text-3xl mb-8 mt-10 ">SIGNUP</h1>
          <form className="flex flex-col">

            <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3'>
              <label className="text-white text-3xl font-normal mb-2" htmlFor="Name">
                Name
              </label>
              <input className="border rounded-lg py-2 px-3 text-gray-500 bg-opacity-0 bg-black mb-5 mt-1" id="Name" placeholder="Enter your Name" required></input>
              <label className="text-white text-2xl font-normal mb-2" htmlFor="RollNo">
                Roll No
              </label>
              <input className="border rounded-lg py-2 px-3 text-gray-500 bg-opacity-0 bg-black mb-5 mt-1" id="RollNo" placeholder="Enter your Roll Number" required></input>
            </div>

            <label className="text-white text-2xl font-normal mb-2" htmlFor="Contact">
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
              </p>
               
                <a href="/login" className="inline-block align-baseline font-normal text-xl"> Log In </a>
             
            </div>
            <div className="flex justify-center mt-4">
            <button
                type="submit"
                className="inline-block align-baseline font-normal text-2xl bg-yellow-500 w-[350px] h-[50px] rounded py-2 px-4  "
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
