/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          161616: "#161616",
          "1E1E1E": "#1E1E1E",
          yellow: "#FDB515",
          green: "#02A556",
          grey: "#BCBCBC",
          "dark-grey": "#565656",
          121212: "#121212",
          212121: "#212121",
          "0F0F0F": "rgba(15, 15, 15, 0.8)",
        },
      },
      fontFamily: {
        oswald: ["var(--font-oswald)"],
        roboto: ["var(--font-roboto)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      aspectRatio: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
      },
    },
  },
  variants: {
    aspectRatio: ["responsive"],
  },
  // Add prettier tailwind plugin
  plugins: [],
}
