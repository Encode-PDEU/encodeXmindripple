import { useState } from 'react';
import { useRouter } from 'next/router';

const NavBar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`relative flex items-center justify-between p-6`}>
            <div className="flex items-center gap-x-4">
                {/* Hamburger icon */}
                <div className="absolute top-0 right-0 md:hidden p-8">
                    <button onClick={toggleMenu}>
                    {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                <img src="/images/mindripple_logo.png" alt="MindRipple Logo" className="h-[50px] w-[50px]" />
                <img src="/images/X.png" alt="x" className="h-[30px] w-[18px]" />
                <img src="/images/Encode_Logo.png" alt="Encode Logo" className="h-[52px] w-[50px]" />
            </div>

            {/* Responsive menu */}
            <div className={`md:flex md:flex-row md:items-center md:gap-x-8  ${isMenuOpen ? 'block' : 'hidden'} ${isMenuOpen ? 'bg-gray-900' : ''}`}>
                <a href="/riddles" className={`font-medium text-2xl ${router.pathname === '/riddles' ? 'text-yellow-500' : 'text-green-500'}`}>Riddles</a>
                <a href="/leaderboard" className={`font-medium text-2xl ${router.pathname === '/leaderboard' ? 'text-yellow-500' : 'text-green-500'}`}>Leaderboard</a>
                <a href="/profile" className={`font-medium text-2xl ${router.pathname === '/profile' ? 'text-yellow-500' : 'text-green-500'}`}>Profile</a>
                <button className="md:border md:border-yellow-500 text-yellow-500 font-semibold md:px-4 md:py-2 rounded-lg hover:bg-yellow-500 text-2xl">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default NavBar;
