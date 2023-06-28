/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "#bdd4fa",
      },
      backgroundColor: {
        primary: "#fff",
        secondary: "#bdd4fa",
        tertiary: "#6aa6f9",
      },
    },
  },
  plugins: [],
};
