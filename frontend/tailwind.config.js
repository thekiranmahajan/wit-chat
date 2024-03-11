/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Marvel: ['"Marvel"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
