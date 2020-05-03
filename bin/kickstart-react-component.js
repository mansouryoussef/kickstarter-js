const program = require("commander");
const action = require("../commands/react-component");

program
  .option("-n, --component-name <string>", "Component name.")
  .option("-c,--class-based ", "Create class-based component.", false)
  .option("-ts,--typescript ", "Create typescript component.", false)
  .option("--scss", "Create component with scss stylesheet.", false)
  .option(
    "-m,--stylesheet-module",
    "Create component with stylesheet module.",
    false
  )

  .action((options) => {
    action(options);
  });
program.parse(process.argv);
