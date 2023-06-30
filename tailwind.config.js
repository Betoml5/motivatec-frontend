/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "#bdd4fa",
        tertiary: "#6aa6f9",
        hardBlue: "#0791e6",
      },
      backgroundColor: {
        primary: "#fff",
        secondary: "#bdd4fa",
        tertiary: "#6aa6f9",
        grayWhite: "#f6f6f6",
      },
    },
  },
  plugins: [],
};
