
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Logos from "./logos";

const Login = () => {
  const router = useRouter();

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent the form from submitting
    // Add your signup logic here if needed
    router.push("/riddles"); // Direct to the riddles page
  };
  return (
    <div className="flex flex-col font-oswald md:flex-row">

      <Logos />
      <div className="md:w-[50%]">

        <div className="flex flex-col md:items-center bg-custom-161616 w-full ">
          <h1 className="text-green-600 font-semibold md:justify-center md:items-center text-3xl mb-8 mt-10 ">LOGIN</h1>
          <form>
            <label className="text-white text-2xl font-normal mb-2" htmlFor="Email">
              Email
            </label>
            <input className="border rounded-lg w-full py-2 px-3 text-gray-500 bg-opacity-0 bg-black mb-5 mt-1" id="Email" placeholder="Enter your Email" required></input>

            <label className="text-white text-2xl font-normal" htmlFor="password">
              Password
            </label>
            <input className="border rounded-lg w-full py-2 px-3 text-gray-500 bg-opacity-0 bg-black p-4 mb-5 mt-1 " id="password" type="password" placeholder="Enter Password" required></input>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-white text-2xl font-normal" type="button">
                Don't have an account?
              </p>
              
                <a href="/signup" className="inline-block align-baseline font-normal text-2xl"> Sign up </a>
             
            </div>
            <div className="flex justify-center mt-4">
            <button
                type="submit"
                className="inline-block align-baseline font-normal text-2xl bg-yellow-500 w-[350px] h-[50px] rounded py-2 px-4  "
              >
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
