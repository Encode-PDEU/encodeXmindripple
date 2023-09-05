import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
const SideNav = () => {
    const router = useRouter();
    return ( 
        <div className="bg-custom-161616 w-96 p-4 h-screen opacity-80">
                <div className="flex flex-row flex-wrap gap-x-4 align-baseline">
                    <Image src="/Images/mindripple_logo.png" alt="MindRipple Logo" width= {500} height= {500} className="h-[51px] w-[57px]" />
                    <Image src="/Images/X.png" alt="x" width= {500} height= {500} className="h-[30px] w-[18px] mt-4" />
                    <Image src="/Images/Encode_Logo.png" alt="Encode Logo" width= {500} height= {500} className="h-[46px] w-[62px] mt-1" />
                </div>
                <div className="mt-8 ml-5 flex flex-col">

                    <Link href="/admin/allquestions" className={`text-4xl font-normal w-[328px] h-[68px]  justify-center items-center flex flex-row ${router.pathname === '/admin/allquestions' ? 'bg-custom-1E1E1E rounded-md' : ''}`}>All Questions</Link>
                    <Link href="/admin/postquestion" className={`text-4xl font-normal w-[328px] h-[68px]  justify-center items-center flex flex-row ${router.pathname === '/admin/postquestion' ? 'bg-custom-1E1E1E rounded-md' : ''}`}>Post Question</Link>
                </div>
            </div>
     );
}
 
export default SideNav;