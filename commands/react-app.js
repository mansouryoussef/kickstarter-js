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
    check_if_user_want_repo,
    check_for_project_name,
  } = task_functions;

  await check_for_project_name();

  const user_want_github_repo = await check_if_user_want_repo();

  const tasks = [
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
  ];

  if (!user_want_github_repo) tasks.pop();

  const action = new listr(tasks);

  await action.run();
};
