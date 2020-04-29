const listr = require("listr");
const CreateReactApp = require("../lib/CreateReactApp");

module.exports = async (options) => {
  const { projectName, typescript } = options;

  const task_functions = new CreateReactApp(projectName, typescript);

  const {
    create_project_directory,
    create_react_app,
    remove_unnecessary_files,
    create_github_repo,
    link_remote_repo,
  } = task_functions;

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
      title: "Remove unnecessary boilerplate.",
      task: remove_unnecessary_files,
    },
    {
      title: "Create github repo.",
      task: create_github_repo,
    },
    {
      title: "Link remote repo.",
      task: link_remote_repo,
    },
  ]);

  await tasks.run();
};
