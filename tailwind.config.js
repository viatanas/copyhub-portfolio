/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "mac-wallpaper",
    "black-wallpaper",
    "blue-wallpaper",
    "green-wallpaper",
    "orange-wallpaper",
    "purple-wallpaper",
    "red-wallpaper",
    "bg-[#7A8797]",
    "bg-[#2B1534]",
    "bg-[#364E4F]",
    "bg-[#983430]",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
      },
    },
  },
  plugins: [],
};
