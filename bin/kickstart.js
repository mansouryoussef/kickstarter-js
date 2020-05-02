#!/usr/bin/env node
const program = require("commander");
const pkg = require("../package.json");
const react_app_action = require("../commands/react-app");

program
  .version(pkg.version)
  .command("token", "Manage personal github token.")
  .command("react-app", "Create react app template.")
  .alias("ra")
  .command("react-component", "Create react component template.")
  .alias("rc")
  .parse(process.argv);
