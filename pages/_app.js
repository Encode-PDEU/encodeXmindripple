import "@/styles/globals.css";
import { ReactMatrixAnimation } from "react-matrix-animation";
import { Oswald, Roboto } from '@next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});
export default function App({ Component, pageProps }) {
  return (
    <main className={oswald.className}>
      <div className="relative overflow-x-hidden">
        <div className="fixed top-0 left-0 z-0 pointer-events-none w-screen  opacity-20">
          <ReactMatrixAnimation />
        </div>
        <div className="relative z-10">
          <Component {...pageProps} />
        </div>
      </div>
    </main>
  );
}
