const path = require("path");
const preprocessCss = require("./lib/webpack/preprocessCss.js");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    bundle: ["./src/main.js"],
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
      "@": path.resolve("src"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: false,
            hotReload: false,
            preprocess: {
              style: preprocessCss("client"),
            },
          },
        },
      },
    ],
  },
  mode,
  devtool: prod ? false : "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
};
