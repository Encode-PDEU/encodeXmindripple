import React, { useState, useEffect } from "react";
import { ReactMatrixAnimation } from 'react-matrix-animation';
import Login from "./login";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Delay for 3 seconds before showing the login page
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 3000);

    // Clear the timer if the component unmounts or changes before the delay is over
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen flex-col justify-center items-center bg-matrixBlack space-y-8 font-oswald">
      <ReactMatrixAnimation />
      <div className="flex flex-row items-center flex-wrap gap-x-4 justify-center"> {/* Add flex-wrap and justify-center for mobile responsiveness */}
        <img src="/Images/mindripple_logo.png" alt="MindRipple Logo" className="h-[150px] w-[181px]"/>
        <img src="/Images/X.png" alt="x" className="h-[80px] w-[44px]"/>
        <img src="/Images/Encode_Logo.png" alt="Encode Logo" className="h-[150px] w-[150px]" />
      </div>
      <div className="flex flex-row font-semibold text-3xl sm:text-7xl"> {/* Use different font size for mobile and larger screens */}
        <p className="text-green-500">Surf</p>
        <p className="text-yellow-500">Quest</p>
        <p className="text-green-500 gap-x-2"> 1.0</p>
      </div>
      <div>
        <p className="text-white font-semibold text-3xl sm:text-5xl">MindRipple X Encode</p> {/* Use different font size for mobile and larger screens */}
      </div>
      {showLogin && <Login />} {/* Render the LoginPage component if showLogin is true */}
    </div>
  );
};

export default Home;
