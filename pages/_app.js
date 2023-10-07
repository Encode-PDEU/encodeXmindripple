import "@/styles/globals.css"
import { ReactMatrixAnimation } from "react-matrix-animation"
import { Oswald, Roboto } from "next/font/google"
import { ToastContainer } from "react-toastify"
import { useRouter } from "next/router"
import NextjsTransition from "nextjs-page-transitions"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})
export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <main className={`${oswald.className} ${roboto.className}`}>
      <div className="relative overflow-x-hidden h-screen">
        <div className="fixed top-0 left-0 z-0 pointer-events-none w-screen opacity-20 h-screen">
          <ReactMatrixAnimation
            fadeFactor={0.04}
            tileSet={[
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
              "L",
              "M",
              "N",
              "O",
              "P",
              "Q",
              "R",
              "S",
              "T",
              "U",
              "V",
              "W",
              "X",
              "Y",
              "Z",
              "!",
              "@",
              "#",
              "$",
              "%",
              "^",
              "&",
              "*",
              "(",
              ")",
              "-",
              "_",
              "=",
              "+",
              "[",
              "]",
              "{",
              "}",
              "|",
              "\\",
              ":",
              ";",
              "<",
              ">",
              ",",
              ".",
              "?",
              "/",
              "`",
              "~",
              "§",
              "€",
              "¥",
              "£",
              "¢",
              "µ",
              "©",
              "®",
              "ß",
              "Æ",
              "Þ",
              "Ð",
              "ƒ",
              "Σ",
              "Ω",
              "Δ",
              "Γ",
              "Λ",
              "Π",
              "Ψ",
              "Б",
              "Г",
              "Д",
              "Ё",
              "Ж",
              "З",
              "И",
              "Й",
              "Ц",
              "Ч",
              "Ш",
              "Щ",
              "Ъ",
              "Ы",
              "Ь",
              "Э",
              "Ю",
              "Я",
              "І",
              "Ї",
              "Є",
              "Ґ",
              "Ғ",
              "Ү",
              "Һ",
              "Ә",
              "Ө",
              "Ң",
              "Ұ",
              "Қ",
            ]}
          />
        </div>
        <div className="relative z-10 ">
          <ToastContainer />
          <div key={router.route}>
            <NextjsTransition animation="fade" duration={0.5}>
              <Component {...pageProps} />
            </NextjsTransition>
          </div>
          {/* <Component {...pageProps} /> */}
        </div>
      </div>
    </main>
  )
}
