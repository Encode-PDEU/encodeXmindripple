import { useRouter } from 'next/router'; // Import the useRouter hook
import NavBar from './navbar';

const Riddles = () => {

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className='mt-5 flex flex-row justify-between'>
                <p className='text-yellow-600 text-7xl font-semibold'>RIDDLES N PUZZLES</p>
                <div className='flex flex-col'>
                    <p className='font-semibold text-3xl text-green-500 flex flex-row space-x-2'>Answered: <span className='text-white flex-row pl-2'>5/5</span> </p>
                    <p className='font-semibold text-3xl text-green-500 flex flex-row'>Your Score: <span className='text-white flex-row pl-2'>2500</span ></p>
                </div>
            </div>
            <div className='flex flex-row items-center justify-center h-screen'>
                <button className='text-white text-3xl mr-6 h-[90px] w-[90px] bg-transparent'>&lt;</button> {/* Left Button */}
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-green-500 font-semibold text-6xl mb-4 font-roboto'>Active Riddle</p>
                    <p className='text-white font-normal text-3xl text-center'>
                        Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis?
                    </p>
                    <div className="w-60 h-px bg-gray-500 absolute  left-1/2 transform -translate-x-1/2">
                    <input
                        type="text"
                        className="text-gray-500 font-semibold text-lg text-center bg-transparent border-b border-gray-500 outline-none"
                        placeholder="Enter your answer"
                    />
                </div>
                </div>
                <button className='text-white text-3xl mr-6 h-[90px] w-[90px] bg-transparent'>&gt;</button> {/* Right Button */}
                
            </div>

        </div>
    );
}

export default Riddles;
