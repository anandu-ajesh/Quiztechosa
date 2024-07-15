/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        purple: "#A729F5",
        darkNavy: "#313E51",
        navy: "#3B4D66",
        greyNavy: "#626C7F",
        lightBluish: "#ABC1E1",
        lightGrey: "#F4F6FA",
        green: "#26D782",
        red: "#EE5454",
        btnHover: "#D394FA",
      },
      backgroundImage: {
        backgroundDesktopDark: "url('/desktop.svg')",
        backgroundDesktopLight: "url('/desktop-light.svg')",
        backgroundMobileDark: "url('/mobile.svg')",
        backgroundMobileLight: "url('/mobile-light.svg')",
        backgroundTabletDark: "url('/tablet.svg')",
        backgroundTabletLight: "url('/tablet-light.svg')",
      },
    },
  },
  plugins: [],
};
