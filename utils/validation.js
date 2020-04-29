require("colors");
const isRequired = (input) =>
  input === "" ? "This value is required.".red : true;

module.exports = { isRequired };
