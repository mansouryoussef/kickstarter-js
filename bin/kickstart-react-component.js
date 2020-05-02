const program = require("commander");
// const action = require("../commands/react-component");

program
  .option("-n, --component-name <string>", "Component name.")
  .option("-c,--class-based ", "Create class-based component.", false)
  .option("--scss", "Create component with scss stylesheet.", false)
  .option("--scss-module", "Create component with scss module.", false)
  .option("--css-module", "Create component with css module.", false)
  .action((options) => {
    // action(options);
  });
program.parse(process.argv);
