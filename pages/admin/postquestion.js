import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from "./sidenav";
import { ReactMatrixAnimation } from "react-matrix-animation";
import DatePicker from 'react-datepicker'; // Import react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
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
const Postquestion = () => {
    const [state, setState] = useState("");
    const onInput = (e) => setState(e.target.value);
    const onSubmit = () => {
        setState("");
      };
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [isMobile, setIsMobile] = useState(false);

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
//   useEffect(() => {
//     // Check if the window width is less than a certain value (e.g., 768 for mobile)
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 748);
//     };

//     // Initial check
//     checkIsMobile();

//     // Add a listener for window resize
//     window.addEventListener("resize", checkIsMobile);

//     // Clean up the listener when the component is unmounted
//     return () => {
//       window.removeEventListener("resize", checkIsMobile);
//     };
//   }, []);
    const handleDateChange = (newDate) => {
        setDate(newDate); 
    };
    const handlePost = (event) => {
        const handleDateChange = (newDate) => {
            setDate(newDate); 
        };
            event.preventDefault();
            axios.post(`${API_URL}/riddle/add`, {question: question, answer: answer, date: date}).then((res) => {
              console.log(res.data)
              //localStorage.setItem('token', JSON.stringify(res.data))
               //router.push("postquestion")
            })
            .catch((err) =>  {
              console.log(err)
            })
          };

    
    
  
    return (
    <div className=  "flex flex-row">

        {isMobile && <ReactMatrixAnimation />}
            <div>

                {/* left part */}
                <SideNav />
            </div>
            {/* right part */}

            <div className=" flex flex-col mt-3  ml-4">
    <div className={`${oswald.className} text-4xl font-semibold text-yellow-500 mb-2`}>POST QUESTION</div>
    <div className="flex flex-row mt-4">
    <form onSubmit={onSubmit} className="flex flex-col items-start">
    <label className="font-normal text-2xl">Question</label> 
    <textarea className="h-[100px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-xl font-normal p-4" 
    placeholder="Enter Question"
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    ></textarea>
    <label className="font-normal text-22xl">Answer</label> 
    <textarea className="h-[65px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-xl font-normal p-4 " 
    placeholder="Enter Correct Answer"
    value={answer}
    onChange={(e) => setAnswer(e.target.value)}
    ></textarea>
    <label className="font-normal text-2xl">Date</label> 
    <DatePicker selected={date}  onChange={handleDateChange} dateFormat="MMMM dd, yyyy" className="h-[65px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-2xl p-4"
    />
    <div className="flex justify-center mt-4">
        <button
           type="submit"
           className="inline-block align-baseline font-semibold text-2xl bg-yellow-500 w-[200px] h-[50px] rounded py-2 px-4 text-black"
           value={state}
           onInput={onInput}
           onClick={handlePost}
        >
           POST
        </button>
      </div>
    </form>
  </div>
</div>
</div>
    );

}

export default Postquestion;