require("dotenv").config();

const path = require("path");
const webpack = require("webpack");

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    content_script: "./src/scripts/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        BASE_URL: JSON.stringify(process.env.BASE_URL),
      },
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
