const inquirer = require("inquirer");
const TokenManager = require("../lib/TokenManager");
const { isRequired } = require("../utils/validation");
require("colors");

const token = {
  async set() {
    const tokenManager = new TokenManager();

    const input = await inquirer.prompt([
      {
        type: "input",
        name: "token",
        message: "Please enter github personal token:".green,
        validate: isRequired,
      },
    ]);

    const token = tokenManager.setToken(input.token);

    if (token) {
      console.log("Personal token set!".blue);
    }
  },
  show() {
    try {
      const tokenManager = new TokenManager();

      const token = tokenManager.getToken();

      console.log("Current personal token:", token.yellow);

      return token;
    } catch (error) {
      console.error(error.message.red);
    }
  },
  remove() {
    try {
      const tokenManager = new TokenManager();

      tokenManager.deleteToken();

      console.log("Token removed!".blue);

      return;
    } catch (error) {
      console.error(error.message.red);
    }
  },
};

module.exports = token;
