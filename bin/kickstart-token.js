const program = require("commander");
const token_commands = require("../commands/token");

const { set, show, remove } = token_commands;

program.command("set").description("Set personal token.").action(set);

program.command("show").description("Show personal token.").action(show);

program.command("remove").description("Remove personal token.").action(remove);

program.parse(process.argv);
