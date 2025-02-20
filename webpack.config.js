const path = require("path");

module.exports = {
  entry: {
    content: "./scripts/fetchContent.js", // Your content script
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production", // Ensures no eval() in production
};
