const program = require("commander");
const react_app_action = require("../commands/react-app");

program
  .option("-t, --typescript", "Create typescript template.", false)
  .option("-n, --project-name <type>", "flavour of pizza")
  .action((options) => {
    react_app_action(options);
  });
program.parse(process.argv);
