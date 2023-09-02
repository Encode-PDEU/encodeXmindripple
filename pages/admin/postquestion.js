import React, { useState } from 'react';
import SideNav from "./sidenav";
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

const Postquestion = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate); // Update the state with the new selected date
    };

    
    
  
    return (
        <div className="flex flex-row">
            <div>

                {/* left part */}
                <SideNav />
            </div>
            {/* right part */}

            <div className=" flex flex-col mt-3  ml-4">
    <div className={`${oswald.className} text-7xl font-semibold text-yellow-500 mb-2`}>POST QUESTION</div>
    <div className="flex flex-row mt-4">
    <form className="flex flex-col items-start">
    <label className="font-normal text-4xl">Question</label> 
    <textarea className="h-[179px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-2xl font-normal p-4" placeholder="Enter Question"></textarea>
    <label className="font-normal text-4xl">Answer</label> 
    <textarea className="h-[65px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-2xl font-normal p-4 " placeholder="Enter Correct Answer"></textarea>
    <label className="font-normal text-4xl">Date</label> 
    <DatePicker selected={date}  onChange={handleDateChange} dateFormat="MMMM dd, yyyy" className="h-[65px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-2xl p-4"
                        />
</form>

    </div>
</div>

        </div>
    );

}

export default Postquestion;