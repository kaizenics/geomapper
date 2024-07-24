/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pthin: ["Kanit-Thin", "sans-serif"],
        pextralight: ["Kanit-ExtraLight", "sans-serif"],
        plight: ["Kanit-Light", "sans-serif"],
        pregular: ["Kanit-Regular", "sans-serif"],
        pmedium: ["Kanit-Medium", "sans-serif"],
        psemibold: ["Kanit-SemiBold", "sans-serif"],
        pbold: ["Kanit-Bold", "sans-serif"],
        pextrabold: ["Kanit-ExtraBold", "sans-serif"],
        pblack: ["Kanit-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
