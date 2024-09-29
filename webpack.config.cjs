const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  }),
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
]

module.exports = {
  mode: "development",
  target: "web",
  plugins,
  devtool: "inline-source-map",
  entry: "./src/playground/base.tsx",
  devServer: {
    static: "./public",
    port: 3005,
    hot: true,
    liveReload: true,
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(jpg|svg|png)$/i,
        loader: "url-loader",
      },
    ],
  },
}
