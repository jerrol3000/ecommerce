const current_mode =
  process.env.NODE_ENV == "production" ? "production" : "development";
module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  mode: current_mode,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images/",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
