/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./src/assets/images/waves.svg')",
      },
    },
    container: {
      padding: {
        md: "2rem",
        lg: "10rem",
      },
    },
  },
  plugins: [],
};
