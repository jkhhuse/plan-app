module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          title: "#134094",
          bg: "#F6F6FA",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
