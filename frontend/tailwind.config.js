/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#131313",
        secondary: "#ffffff",
      },
      container: {
        center: true,
        padding:{
          DEFAULT: "1rem",
          sm:"3rem",
        }
      }
    },
  },
  plugins: [],
}

