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
    ask_for_github_repo,
    set_github_api_token,
  } = task_functions;

  const check_for_github_repo = async () => {
    try {
      const tokenManager = new TokenManager();

      await tokenManager.getToken();
      // There is a token set therefor, user wants github repo
      return true;
    } catch (error) {
      // There is no token set therefor, ask if user wants github repo.
      const user_want_github = await ask_for_github_repo();

      if (user_want_github) {
        await set_github_api_token();
        return true;
      }
      // user does not want github repo.
      return false;
    }
  };

  const user_want_github_repo = await check_for_github_repo();

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
