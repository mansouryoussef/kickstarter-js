require("colors");

const isRequired = (input) =>
  input === "" ? "This value is required.".red : true;

const is_lowercase = (string) => {
  if (typeof string === "string") return string.toLowerCase() === string;

  return;
};

module.exports = { isRequired, is_lowercase };
