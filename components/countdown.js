import Countdown from "react-countdown"
import { useMemo } from "react"

export default function CountdownTimer({ timeDifference }) {
  return (
    <>
      <p className="justify-center flex flex-row items-center text-yellow-600 text-2xl md:text-3xl font-semibold mt-4 mb-5 ">
        {/* Next Riddle In: 2D: 10 H: 56 M: 10 S */}
        Next Riddle {"   "}
        <Countdown date={Date.now() + timeDifference}>
          <span> has arrived! Solve current riddle to unlock it.</span>
        </Countdown>
      </p>
    </>
  )
}
