import { useState } from 'react';
import {getSession} from 'next-auth/react';
import NavBar from './navbar';
import { ReactMatrixAnimation } from 'react-matrix-animation';
import { Oswald, Roboto } from '@next/font/google';
const oswald = Oswald({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
  });

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
  });
const riddlesData = [
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I? I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I? ",
        answer: "xyz"
    },
    {
        question: "I have keys but open no locks. I have space but no room. You can enter, but you can't go outside. What am I? ",
        answer: "mno"
    },
    {
        question: "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I? ",
        answer: "abc"
    },
    // Add more riddles here...
];

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  }
  


const Riddles = () => {
    const [activeRiddleIndex, setActiveRiddleIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handlePreviousClick = () => {
        setActiveRiddleIndex(prevIndex => Math.max(prevIndex - 1, 0));
        setUserAnswer("");
        setShowMessage(false);
    };

    const handleNextClick = () => {
        if (userAnswer.toLowerCase() === riddlesData[activeRiddleIndex].answer.toLowerCase()) {
            setActiveRiddleIndex(prevIndex => Math.min(prevIndex + 1, riddlesData.length - 1));
            setUserAnswer("");
            setShowMessage(false);
        } else {
            setShowMessage(true);
        }
    };

    return (
        <div className={` ${roboto.className} bg-matrixBlack z-999`}>
            <NavBar />
            <div className='mt-5 flex flex-col md:flex-row justify-between p-6 m-auto top-0 left-0 z-0 '>
                <p className= {`${oswald.className} text-yellow-600 text-3xl md:text-5xl font-semibold`}>RIDDLES N PUZZLES</p>
                <div className='flex flex-row md:flex-col text-lg md:text-2xl space-x-3'>
                    <p className='font-semibold  text-green-500 flex flex-row space-x-2'>Answered: <span className='text-white flex-row pl-2'>5/5</span> </p>
                    <p className='font-semibold  text-green-500 flex flex-row'>Your Score: <span className='text-white flex-row '>2500</span ></p>

                </div>
            </div>
            <div className='flex flex-row items-center justify-center mt-6 p-6 '>
                <button
                    className='text-white text-2xl w-[150px] h-[60px] bg-custom-1E1E1E rounded-full  items-center justify-center hidden md:flex '
                    onClick={handlePreviousClick}
                >
                    &lt;
                </button>
                <div className='flex flex-col justify-normal  md:items-center md:justify-center'>
                    <p className='text-green-500 font-semibold text-2xl md:text-3xl mb-4 font-roboto '>Active Riddle</p>
                    <p className='text-white font-normal text-lg md:text-xl justify-normal  md:items-center md:justify-center w-4/5 text-[20px]'>
                        {riddlesData[activeRiddleIndex].question}
                    </p>
                </div>
                <button className='text-white text-3xl w-[150px] h-[60px] bg-custom-1E1E1E rounded-full  items-center justify-center hidden md:flex '
                    onClick={handleNextClick}>&gt;</button> {/* Right Button */}
            </div>
            <div className="flex md:flex-col flex-row md:items-center md:justify-center justify-start">
                <div className="text-center flex flex-row md:flex-col pl-10">
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="mt-6 text-gray-100 font-semibold text-lg text-center bg-transparent border-b border-gray-500 outline-none md:w-[502px] w-[160px]"
                        placeholder="Enter your answer"
                    />
                    {showMessage && <p className="text-red-500 mt-2">Wrong answer! Try again.</p>}
                </div>
                <div className='flex flex-row md:flex-col md:ml-4 '>
                    <button className="border flex flex-col md:flex-row border-green-500 text-green-500 justify-center items-center rounded-lg  font-semibold text-2xl   md:w-[153px] md:h-[53px] w-[200] h-[60] mt-4 ml-3 px-2 py-2">
                        Submit
                    </button>
                </div>
            </div>
            <div className='w-full flex justify-between p-6 md:hidden'>
                <button className="w-[122px] h-[50px] font-semibold text-lg bg-gray-900 rounded-lg px-2 py-2" onClick={handleNextClick}>
                    Previous
                </button>
                <button className='font-semibold text-lg bg-gray-900 rounded-lg px-2 py-2 w-[122px] h-[50px]' onClick={handleNextClick}>
                    Next
                </button>
            </div>
            <p className='justify-center flex flex-row items-center text-yellow-600 text-2xl md:text-3xl font-semibold mt-4 mb-5 '>
                Next Riddle In:  2D: 10 H: 56 M: 10 S
            </p>
        </div>
    );


}

export default Riddles;
