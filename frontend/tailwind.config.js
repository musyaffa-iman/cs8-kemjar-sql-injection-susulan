/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        portal: {
          bg: "#F4F6FA",
          ink: "#1B2333",
          muted: "#5B6475",
          line: "#DDE2EB",
          primary: "#0F766E",
          "primary-dark": "#0B5C56",
        },
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
