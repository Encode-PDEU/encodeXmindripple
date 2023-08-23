import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import Login from './login';

import { ReactMatrixAnimation } from 'react-matrix-animation';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    // Delay for 3 seconds before showing the login page
    const timer = setTimeout(() => {
      setShowLogin(true);
      router.push('/login'); // Redirect to the login page after the delay
    }, 3000);

    // Clear the timer if the component unmounts or changes before the delay is over
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex h-screen flex-col justify-center items-center bg-matrixBlack space-y-8">
      <ReactMatrixAnimation />
      <div className="flex flex-row items-center flex-wrap gap-x-4 justify-center"> {/* Add flex-wrap and justify-center for mobile responsiveness */}
        <img src="/images/mindripple_logo.png" alt="MindRipple Logo" className="h-[150px] w-[181px]"/>
        <img src="/images/X.png" alt="x" className="h-[80px] w-[44px]"/>
        <img src="/images/Encode_Logo.png" alt="Encode Logo" className="h-[150px] w-[150px]" />
      </div>
      <div className="flex flex-row font-semibold text-3xl sm:text-7xl"> {/* Use different font size for mobile and larger screens */}
        <p className="text-green-500">Surf</p>
        <p className="text-yellow-500">Quest</p>
        <p className="text-green-500 gap-x-2"> 1.0</p>
      </div>
      <div>
        <p className="text-white font-semibold text-3xl sm:text-5xl mb-5 font-roboto">MindRipple X Encode</p> {/* Use different font size for mobile and larger screens */}
      </div>
      <div>
      {showLogin && <Login />} {/* Render the LoginPage component if showLogin is true */}
      </div>
      
      
    </div>
  );
}
