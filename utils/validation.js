require("colors");

const is_required = (input) =>
  input === "" ? "This value is required.".red : true;

const is_lowercase = (string) => {
  if (typeof string === "string") return string.toLowerCase() === string;

  return;
};

const validate_project_name = (string) => {
  const is_required_error = is_required(string);

  if (typeof is_required_error === "string") {
    return is_required_error;
  }

  const string_is_lowercase = is_lowercase(string);

  if (!string_is_lowercase) {
    return (
      "Create React App does not support uppercase letters.".red +
      " Please try again."
    );
  }

  return true;
};

module.exports = { is_required, is_lowercase, validate_project_name };
