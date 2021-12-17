module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          main: "#134094",
          sub: "#F6F6FA",
        },
        design: {
          secondary: "#154EA0",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
