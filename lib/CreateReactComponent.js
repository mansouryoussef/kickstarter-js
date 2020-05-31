const fs = require("fs");
const inquirer = require("inquirer");
const {} = require("../utils/validation");
require("colors");

class CreateReactComponent {
  constructor(component_name, typescript, scss, stylesheet_module) {
    this.component_name = component_name;
    this.stylesheet_module = stylesheet_module;
    this.component_extension = typescript ? ".tsx" : ".js";
    this.scss = scss;
  }

  create_component_directory = () => {
    if (fs.existsSync(`./${this.component_name}`)) {
      throw new Error(`${this.component_name} folder Already exists.`.red);
    }

    fs.mkdirSync(`${this.component_name}`);
  };

  append_to_second_line = (path, string) => {
    const file_contents = fs.readFileSync(path, "utf8", (err, data) => {
      if (err) console.log(err);
    });

    const lines_array = file_contents.split("\n");

    const first_line = lines_array.shift();

    const new_contents = [first_line, string, ...lines_array].join("\n");

    fs.writeFileSync(path, new_contents);
  };

  create_component_js = () => {
    const template = `import React from 'react'

export default function ${this.component_name}() {
  return (
    <div data-testid="${this.component_name}">
      <h1>
          ${this.component_name} Component        
      </h1>
    </div>
  )
}`;

    fs.writeFileSync(
      `${this.component_name}/${this.component_name}.js`,
      template,
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );
  };

  create_component_ts = () => {
    const template = `import React, { ReactElement } from 'react'

interface Props {
        
}
    
export default function ${this.component_name}({}: Props): ReactElement {
  return (
    <div data-testid="${this.component_name}">
      <h1>
          ${this.component_name} Component        
      </h1>
    </div>
 )
}`;

    fs.writeFileSync(
      `${this.component_name}/${this.component_name}.tsx`,
      template,
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );
  };

  create_component_css = () => {
    fs.writeFileSync(
      `${this.component_name}/${this.component_name}.css`,
      "",
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );

    const css_import = `import '${this.component_name}.css'`;

    this.append_to_second_line(
      `${this.component_name}/${this.component_name}${this.component_extension}`,
      css_import
    );
  };

  create_component_scss = () => {
    fs.writeFileSync(
      `${this.component_name}/${this.component_name}.scss`,
      "",
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );

    const scss_import = `import '${this.component_name}.scss'`;

    this.append_to_second_line(
      `${this.component_name}/${this.component_name}${this.component_extension}`,
      scss_import
    );
  };

  create_component_css_module = () => {
    fs.writeFileSync(
      `${this.component_name}/${this.component_name}.module.css`,
      "",
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );

    const css_module_import = `import Styles from './${this.component_name}.module.css'`;

    this.append_to_second_line(
      `${this.component_name}/${this.component_name}${this.component_extension}`,
      css_module_import
    );
  };

  create_component_scss_module = () => {
    fs.writeFileSync(
      `${this.component_name}/${this.component_name}.module.scss`,
      "",
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );

    const scss_module_import = `import Styles from './${this.component_name}.module.scss'`;

    this.append_to_second_line(
      `${this.component_name}/${this.component_name}${this.component_extension}`,
      scss_module_import
    );
  };

  create_component_test = () => {
    const template = `import React from 'react';
import { render, cleanup } from '@testing-library/react';
    
import ${this.component_name} from './${this.component_name}';

describe('<${this.component_name} />', () => {
  afterEach(cleanup);
    
  test('Should have correct props', () => {
    const props = { };
    
    const {  } = props;
    
    const { getByTestId, container } = render(<${this.component_name} {...props} />);
    
    const ${this.component_name}Component = getByTestId("${this.component_name}");

    expect(${this.component_name}Component).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot();
    
  })
});`;

    fs.writeFileSync(
      `${this.component_name}/${this.component_name}.test${this.component_extension}`,
      template,
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );
  };

  create_component_index = () => {
    const content = `export { default } from './${this.component_name}';`;

    fs.writeFileSync(
      `${this.component_name}/index${
        this.component_extension === ".tsx" ? ".ts" : ".js"
      }`,
      content,
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );
  };

  choose_component_file = () => {
    this.component_extension === ".tsx"
      ? this.create_component_ts()
      : this.create_component_js();
  };

  choose_component_stylesheet = () => {
    this.stylesheet_module;
    this.scss;

    if (this.scss && !this.stylesheet_module) {
      this.create_component_scss();
      return;
    } else if (this.scss && this.stylesheet_module) {
      this.create_component_scss_module();
      return;
    } else if (this.stylesheet_module) {
      this.create_component_css_module();
      return;
    } else {
      this.create_component_css();
      return;
    }
  };

  generate_react_component = () => {
    this.create_component_directory();
    this.choose_component_file();
    this.choose_component_stylesheet();
    this.create_component_test();
    this.create_component_index();
  };
}

module.exports = CreateReactComponent;
