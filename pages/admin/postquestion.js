import React, { useState } from 'react';
import SideNav from "./sidenav";
import date from 'date-and-time';

const Postquestion = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (event) => {
        const inputDate = event.target.value;
        const parsedDate = parse(inputDate, 'YYYY-MM-DD');
        setSelectedDate(parsedDate);
    };

    const formatDateForDisplay = (date) => {
        if (date) {
            return format(date, 'MMMM DD, YYYY'); 
        }
        return '';
    };
    
  
    return (
        <div className="flex flex-row">
            <div>

                {/* left part */}
                <SideNav />
            </div>
            {/* right part */}

            <div className=" flex flex-col mt-12 ml-4">
    <div className="text-7xl font-semibold text-yellow-500">Post Question</div>
    <div className="flex flex-row mt-4">
    <form className="flex flex-col items-start">
    <label className="font-normal text-4xl">Question</label> 
    <textarea className="h-[179px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-2xl font-normal p-4" placeholder="Enter Question"></textarea>
    <label className="font-normal text-4xl">Answer</label> 
    <textarea className="h-[65px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5 text-2xl font-normal p-4 " placeholder="Enter Correct Answer"></textarea>
    <label className="font-normal text-4xl">Date</label> 
    <textarea className="h-[65px] w-[800px] bg-transparent border border-white rounded-xl mt-4 mb-5"> </textarea>
</form>

    </div>
</div>

        </div>
    );

}

export default Postquestion;