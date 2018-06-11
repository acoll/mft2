const fs = require("fs");
const { renderStyles } = require("../build/ssr-build/ssr-bundle");

const styles = renderStyles();

const indexFile = "build/index.html";

const html = fs.readFileSync(indexFile).toString();

const withStyles = html.replace(
  '<style id="styled-components"></style>',
  styles
);

fs.writeFileSync(indexFile, withStyles);
