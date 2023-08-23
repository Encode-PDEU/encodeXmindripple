const Logos_admin = () => {
    return ( 
        <div className="flex md:h-screen flex-col  space-y-8 align-middle justify-center ">
        <div className="flex flex-row items-center flex-wrap gap-x-4 justify-center"> {/* Add flex-wrap and justify-center for mobile responsiveness */}
          <img src="/images/mindripple_logo.png" alt="MindRipple Logo" className="h-[100px] w-[101px]" />
          <img src="/images/X.png" alt="x" className="h-[50px] w-[44px]" />
          <img src="/images/Encode_Logo.png" alt="Encode Logo" className="h-[100px] w-[100px]" />
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
        <div className="flex flex-row font-semibold text-5xl justify-center items-center font-oswald"> 
          <p className="text-green-500 ">Surf</p>
          <p className="text-yellow-500 ">Quest</p>
          <p className="text-green-500 gap-x-2 "> 1.0</p>
        </div>
          <p className="text-white font-semibold text-4xl mt-12">Admin Panel</p>
        </div>
      </div>
     );
}
 
export default Logos_admin;