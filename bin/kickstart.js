#!/usr/bin/env node
const program = require("commander");
const pkg = require("../package.json");
const kickstart_commands = require("../commands/kickstart");

const { react_app } = kickstart_commands;

program
  .version(pkg.version)
  .command("react-app")
  .description("Create react app.")
  .alias("ra")
  .option("-t, --typescript", "Create typescript template.", false)
  .option("-n, --project-name <type>", "flavour of pizza")
  .action((options) => {
    react_app(options);
  });
program.parse(process.argv);
