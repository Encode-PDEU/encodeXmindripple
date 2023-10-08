import Countdown from "react-countdown"

export default function CountdownTimer({ timeDifference }) {
  console.log("timeDifference", timeDifference)
  return (
    <>
      {timeDifference == NaN ? (
        <>
          <p className="justify-center md:flex md:flex-row items-center text-yellow-600 text-2xl md:text-3xl font-semibold mt-4 mb-5 px-6 text-center md:mt-8">
            {/* Next Riddle In: 2D: 10 H: 56 M: 10 S */}
            Wait for the next riddle to arrive!
          </p>
        </>
      ) : (
        <>
          <p className="justify-center md:flex md:flex-row items-center text-yellow-600 text-2xl md:text-3xl font-semibold mt-4 mb-5 px-6 text-center md:mt-8">
            {/* Next Riddle In: 2D: 10 H: 56 M: 10 S */}
            Next Riddle &nbsp;
            <Countdown date={Date.now() + timeDifference}>
              <span>has arrived! Solve current riddle to unlock it.</span>
            </Countdown>
          </p>
        </>
      )}
    </>
  )
}
