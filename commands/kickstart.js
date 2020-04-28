const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const listr = require("listr");
require("colors");

const kickstart = {
  async react_app(options) {
    try {
      const { projectName, typescript } = options;

      if (!projectName) {
        console.log("Please specify project name.".red);
        return;
      }

      const create_react_app = async () =>
        await exec(
          `npx create-react-app ${
            typescript ? "--typescript" : ""
          } ./${projectName}`
        );

      const create_project_directory = () => {
        if (fs.existsSync(`./${projectName}`)) {
          throw new Error(`${projectName} folder Already exists.`.red);
        }

        fs.mkdirSync(projectName);
      };

      const remove_unnecessary_files = async () => {
        await exec("rm -rf logo.svg App.test.jsx ", {
          cwd: `./${projectName}/src/`,
        });

        await exec('echo "" > App.css', {
          cwd: `./${projectName}/src/`,
        });

        await exec('echo "" > index.css', {
          cwd: `./${projectName}/src/`,
        });

        await exec('echo "" > App.test.js', {
          cwd: `./${projectName}/src/`,
        });

        await fs.readFile(
          `./${projectName}/src/App.js`,
          "utf8",
          (err, content) => {
            const content_array = content.split("\n");
            content_array.splice(6, 16, `    <h1>${projectName}</h1>`);
            content_array.splice(1, 1);

            fs.writeFileSync(
              `./${projectName}/src/App.js`,
              content_array.join("\n")
            );
          }
        );
      };

      const tasks = new listr([
        {
          title: "Create project directory.",
          task: create_project_directory,
        },
        {
          title: "Create react application.",
          task: create_react_app,
        },
        {
          title: "Remove unnecessary files.",
          task: remove_unnecessary_files,
        },
      ]);

      await tasks.run();

      // console.log("React app created!".bold);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = kickstart;
