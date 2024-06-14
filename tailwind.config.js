/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#FED200",
        color2: "#8A7AFE",
        activeSidebar: "#F5CF36",
        // sidebar:"#f1f5f9",
        createFeed:"#8A7AFE",
        createbtn:"#DE4C5A",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-soft": "rgb(var(--color-primary-soft) / <alpha-value>)",
        secondery: "rgb(var(--color-secondery) / <alpha-value>)",
        bgbody: "rgb(var(--color-bgbody) / <alpha-value>)",

      },

    },
  },
  plugins: [require("@tailwindcss/forms")],
};
