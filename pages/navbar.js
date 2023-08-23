import { useRouter } from 'next/router';
const NavBar = () => {
    const router = useRouter();
    return ( 
        <div className="flex items-center justify-between p-4">
        <div className="flex flex-row items-center gap-x-4">
            <img src="/images/mindripple_logo.png" alt="MindRipple Logo" className="h-[40px] w-[50px]" />
            <img src="/images/X.png" alt="x" className="h-[30px] w-[18px]" />
            <img src="/images/Encode_Logo.png" alt="Encode Logo" className="h-[52px] w-[40px]" />
        </div>
        <div className="flex flex-row items-center gap-x-8">
            <p className={`font-medium text-2xl ${router.pathname === '/riddles' ? 'text-yellow-500' : 'text-green-500'}`}>Riddles</p>
            <p className={`font-medium text-2xl ${router.pathname === '/leaderboard' ? 'text-yellow-500' : 'text-green-500'}`}>Leaderboard</p>
            <p className={`font-medium text-2xl ${router.pathname === '/profile' ? 'text-yellow-500' : 'text-green-500'}`}>Profile</p>
        </div>
        <button className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 font-semibold text-2xl">
            Logout
        </button>
    </div>
     );
}
 
export default NavBar;