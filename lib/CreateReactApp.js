const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const Axios = require("axios");
const TokenManager = require("./TokenManager");
const inquirer = require("inquirer");
const { isRequired } = require("../utils/validation");
require("colors");

class CreateReactApp {
  constructor(project_name, typescript) {
    this.project_name = project_name;
    this.typescript = typescript;
    this.extension = typescript ? ".tsx" : ".js";
  }

  ask_for_github_repo = async () => {
    const user_input = await inquirer.prompt([
      {
        type: "confirm",
        name: "wants_github_repo",
        message: "Automatically create a git repo on your github?".green,
        validate: isRequired,
      },
    ]);

    return user_input.wants_github_repo;
  };

  set_github_api_token = async () => {
    const tokenManager = new TokenManager();

    const userInput = await inquirer.prompt([
      {
        type: "input",
        name: "token",
        message: "Please enter github personal token:".green,
        validate: isRequired,
      },
    ]);

    const token = tokenManager.setToken(userInput.token);

    if (token) {
      console.log("Personal token set!".blue);
    }
  };

  create_project_directory = async () => {
    if (fs.existsSync(`./${this.project_name}`)) {
      throw new Error(`${this.project_name} folder Already exists.`.red);
    }

    fs.mkdirSync(`${this.project_name}`);
  };

  create_react_app = async () => {
    await exec(
      `npx create-react-app ${this.typescript ? "--typescript" : ""} ./${
        this.project_name
      }`
    );
  };

  remove_unnecessary_files = async () => {
    await exec(`rm -rf logo.svg App.test${this.extension}`, {
      cwd: `./${this.project_name}/src/`,
    });

    await exec('echo "" > App.css', {
      cwd: `./${this.project_name}/src/`,
    });

    await exec('echo "" > index.css', {
      cwd: `./${this.project_name}/src/`,
    });

    await exec(`echo "" > App.test${this.extension}`, {
      cwd: `./${this.project_name}/src/`,
    });

    fs.readFile(
      `./${this.project_name}/src/App${this.extension}`,
      "utf8",
      (err, content) => {
        const content_array = content.split("\n");
        content_array.splice(6, 16, `    <h1>${this.project_name}</h1>`);
        content_array.splice(1, 1);

        fs.writeFileSync(
          `./${this.project_name}/src/App${this.extension}`,
          content_array.join("\n")
        );
      }
    );
  };

  create_github_repo = async () => {
    const tokenManager = new TokenManager();

    const base_URL = "https://api.github.com/";

    await Axios({
      method: "post",
      url: `${base_URL}user/repos`,
      data: {
        name: `${this.project_name}`,
        description: "Repo created by kickstart.js",
        private: true,
        // homepage: "https://github.com",
        // has_issues: true,
        // has_projects: true,
        // has_wiki: true,
      },
      headers: {
        Authorization: `Bearer ${tokenManager.getToken()}`,
      },
    });
  };

  link_remote_repo = async () => {
    await exec(
      `git remote add origin git@github.com:mansouryoussef/${this.project_name}.git`,
      {
        cwd: `./${this.project_name}`,
      }
    );
  };
}

module.exports = CreateReactApp;
