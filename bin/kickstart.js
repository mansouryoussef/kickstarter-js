#!/usr/bin/env node
const program = require("commander");
const pkg = require("../package.json");
const react_app_action = require("../commands/react-app");

program
  .version(pkg.version)
  .command("token", "Manage personal token.")
  .command("react-app", "Create react app.")
  .alias("ra")
  .parse(process.argv);
