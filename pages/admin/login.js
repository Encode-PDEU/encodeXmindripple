import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Logos_admin from "./logos";
import { Oswald, Roboto } from '@next/font/google';
const oswald = Oswald({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
  });

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
  });

const Adminlogin = () => {

  return (
    <div className= {` ${roboto.className} flex flex-col md:flex-row h-full`}>
      <div className="md:w-[50%] bg-black p-6 ">
        <Logos_admin />
      </div>
      <div className="md:w-[50%] bg-custom-161616">
        <div className="flex flex-col md:items-center p-6 ">
          <h1 className={`${oswald.className} text-green-600 font-semibold justify-center items-center text-4xl mb-4 mt-6 p-2`}>LOGIN</h1>
          <form className="flex flex-col w-full">

          <label className="text-white text-2xl font-normal mb-2 items-baseline" htmlFor="Email">
              Email
            </label>
            <input className="border rounded-lg w-full py-2 px-3 text-gray-500 bg-opacity-0 bg-black mb-5 mt-1" id="Email" placeholder="Enter your Email" required></input>

            <label className="text-white text-2xl font-normal" htmlFor="password">
              Password
            </label>
            <input className="border rounded-lg w-full py-2 px-3 text-gray-500 bg-opacity-0 bg-black p-4 mb-5 mt-1 " id="password" type="password" placeholder="Enter Password" required></input>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-white text-xl font-normal" type="button">
                Don't have an account?
              </p>

              <a href="/signup" className="inline-block align-baseline font-normal text-xl"> Sign up </a>

            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="inline-block align-baseline font-semibold text-2xl bg-yellow-500 w-[350px] h-[50px] rounded py-2 px-4 text-black  transition ease-linear duration-300  "
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

export default Adminlogin;
