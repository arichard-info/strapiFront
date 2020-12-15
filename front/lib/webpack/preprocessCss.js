const sass = require("node-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");

/**
 *  Webpack hook : handle the SASS preprocess
 *    - on watch time for development
 *    - on build time for production
 */

module.exports = (mode) => ({ content, attributes, filename }) => {
  // if (mode === "server") return { code: "", map: "" };
  // get path context
  const context = filename.slice(
    0,
    filename.lastIndexOf("/") !== -1
      ? filename.lastIndexOf("/") // remove after last '/'
      : filename.lastIndexOf("\\") // remove after last '\' (windows)
  );

  // PreProcess : SASS
  if (attributes.type === "scss" || attributes.type === "text/scss") {
    const output = sass.renderSync({ data: content, includePaths: [context] });
    return autoprefixStyle(output.css, filename);
  }

  return autoprefixStyle(content, filename);
};

// Autoprefixer for CSS or LESS style
function autoprefixStyle(content, filename) {
  return postcss([autoprefixer])
    .process(content, {
      from: filename,
      to: filename,
    })
    .then((output) => ({
      code: output.css,
      map: output.map,
    }));
}
