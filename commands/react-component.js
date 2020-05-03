const CreateReactComponent = require("../lib/CreateReactComponent");

module.exports = (options) => {
  const { scss, stylesheetModule, componentName, typescript } = options;

  create_react_component = new CreateReactComponent(
    componentName,
    typescript,
    scss,
    stylesheetModule
  );

  create_react_component.generate_react_component();
};
