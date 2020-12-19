const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const preprocessCss = require("./lib/webpack/preprocessCss.js");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

const clientConfig = {
  entry: {
    bundle: ["./src/client/index.js"],
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
    path: __dirname + "/dist/client",
    filename: "client.js",
    chunkFilename: "client.[id].js",
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
            hydratable: true,
            generate: null,
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
};

const serverConfig = {
  entry: {
    bundle: ["./src/server/index.js"],
  },
  target: "node",
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
      "@": path.resolve("src"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: __dirname + "/dist/server",
    filename: "server.js",
    chunkFilename: "server.[id].js",
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: false,
            generate: "ssr",
            hydratable: false,
            css: true,
            hotReload: false,
            preprocess: {
              style: preprocessCss("server"),
            },
          },
        },
      },
    ],
  },
  mode,
  devtool: prod ? false : "source-map",
  plugins: [
    !prod &&
      new NodemonPlugin({
        script: "./dist/server/server.js",
        watch: path.resolve("./dist/server"),
      }),
  ].filter(Boolean),
};

const styleConfig = {
  mode,
  entry: { style: "./src/style/main.scss" },
  output: {
    path: __dirname + "/dist/assets",
    filename: "style.js",
    chunkFilename: "style.[id].js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new miniCssExtractPlugin({ filename: "[name].css" })],
  devtool: prod ? false : "source-map",
};

module.exports = [clientConfig, serverConfig, styleConfig];
