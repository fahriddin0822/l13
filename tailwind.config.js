const colors  = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "rasm":"url('./src/assets/images/calculator.svg')"
      }
    },
    colors:{
      ...colors,
      primary:"red"
    },
    fontFamily:{
      "oxygen":["oxygen"]
    },
    container:{
      center:true,
      screens:{
        sm:"600px",
        md:"728px",
        lg:"984px",
        xl:"1080px",
        '2xl':"1180px"
      },
      padding:"1rem"
    }
  },
  plugins: [],
}