module.exports = ({ file }) => {
  return {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      "postcss-px-to-viewport": {
        viewportWidth: file && file.dirname && file.dirname.includes("vant") ? 375 : 750,
        unitPrecision: 5,
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
      },
    },
  };
};
