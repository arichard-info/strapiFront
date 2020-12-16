const path = require("path");
const preprocessCss = require("./lib/webpack/preprocessCss.js");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

const clientConfig = {
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
};

module.exports = [serverConfig];
