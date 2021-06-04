module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-typescript"],
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  targets: {
    edge: "17",
    firefox: "60",
    chrome: "67",
    safari: "11.1",
  },
};
