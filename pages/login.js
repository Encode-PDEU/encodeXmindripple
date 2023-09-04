import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logos from "./components/logos";
import { ReactMatrixAnimation } from "react-matrix-animation";
import { Oswald, Roboto } from '@next/font/google';
import axios from "axios";
import Link from "next/link";
const oswald = Oswald({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
  });

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL
const Login = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
  
  const handleLogin = (event) => {
    event.preventDefault();
    axios.post(`${API_URL}/user/login`, {email: email, password: password}).then((res) => {
      console.log(res.data)
      localStorage.setItem('token', JSON.stringify(res.data))
       router.push("/riddles")
    })
    .catch((err) =>  {
      console.log(err)
    })
  };

  return (
    <div className={` ${roboto.className} flex md:h-screen flex-col  space-y-8 align-middle justify-center`}>

      {isMobile && <ReactMatrixAnimation />}
      <div className="relative h-screen bg-matrixBlack">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-[50%]  p-6 md:bg-black">
            <Logos />
          </div>
          <div className="md:w-[50%] md:bg-custom-161616 h-screen ">
            <div className="flex flex-col md:items-center p-6 bg-matrixBlack bg-custom-161616">
              <h1 className={`${oswald.className} text-green-600 font-semibold justify-center items-center md:justify-center md:items-center text-5xl mb-4 mt-6 p-2 `}>
                LOGIN
              </h1>
              <form className="flex flex-col w-full">
                <label className="text-white text-2xl font-normal mb-2 items-baseline" htmlFor="Email">
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

                <label className="text-white text-2xl font-normal" htmlFor="password">
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
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <p className="text-white text-xl font-normal" type="button">
                    Do not have an account?
                    <Link href="/signup" className="inline-block align-baseline font-normal text-xl md:ml-60 ml-10">
                      Sign up
                    </Link>
                  </p>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="inline-block align-baseline font-semibold text-2xl bg-yellow-500 w-[350px] h-[50px] rounded py-2 px-4 text-black"
                    onClick={handleLogin}
                  >
                    LogIn
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
