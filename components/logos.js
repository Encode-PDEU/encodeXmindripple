import { Oswald, Roboto } from "next/font/google"
import Image from "next/image"
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const Logos = () => {
  return (
    <div
      className={` ${oswald.className} hidden lg:flex  flex-col  space-y-14 align-middle justify-center lg:h-screen`}
    >
      <div className="flex flex-row items-end flex-wrap gap-x-4 justify-center">
        <Image
          src="/Images/mindripple_logo.png"
          alt="MindRipple Logo"
          width={500}
          height={500}
          className="
          h-20 w-24 sm:h-32 sm:w-36 md:h-[110px] md:w-[130px]"
        />
        <h1 className="text-custom-yellow font-semibold text-5xl uppercase sm:text-6xl">
          X
        </h1>
        <Image
          src="/Images/Encode_Logo.png"
          alt="Encode Logo"
          width={500}
          height={500}
          className="h-20 w-28 sm:h-[100px] sm:w-[130px]"
        />
      </div>
      <div className="flex flex-row font-semibold text-7xl justify-center items-center font-oswald">
        {/* Use different font size for mobile and larger screens */}
        <p className="text-green-500 ">Surf</p>
        <p className="text-yellow-500 ">Quest</p>
        <p className="text-green-500 ml-5"> 1.0</p>
      </div>
    </div>
  )
}

export default Logos
