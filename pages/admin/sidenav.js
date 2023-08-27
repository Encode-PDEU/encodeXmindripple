import { useRouter } from 'next/router';

const SideNav = () => {
    const router = useRouter();
    return ( 
        <div className="bg-custom-161616 w-96 p-4 h-screen opacity-80">
                <div className="flex flex-row flex-wrap gap-x-4 align-baseline">
                    <img src="/images/mindripple_logo.png" alt="MindRipple Logo" className="h-[51px] w-[57px]" />
                    <img src="/images/X.png" alt="x" className="h-[30px] w-[18px] mt-4" />
                    <img src="/images/Encode_Logo.png" alt="Encode Logo" className="h-[46px] w-[62px] mt-1" />
                </div>
                <div className="mt-8 ml-5 flex flex-col">

                    <a href="/admin/allquestions" className={`text-4xl font-normal w-[328px] h-[68px]  justify-center items-center flex flex-row ${router.pathname === '/admin/allquestions' ? 'bg-custom-1E1E1E rounded-md' : ''}`}>All Questions</a>
                    <a href="/admin/postquestion" className={`text-4xl font-normal w-[328px] h-[68px]  justify-center items-center flex flex-row ${router.pathname === '/admin/postquestion' ? 'bg-custom-1E1E1E rounded-md' : ''}`}>Post Question</a>
                </div>
            </div>
     );
}
 
export default SideNav;