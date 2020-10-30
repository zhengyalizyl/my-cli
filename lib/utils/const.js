module.exports.RemoteUrl = {
  vue: "github:su37josephxia/vue-template",
  react: "github:su37josephxia/vue-template"
};

module.exports.featureChoice = function(type) {
  return {
    react: {
      name: "React",
      value: "react",
      choice: [
        {
          name: "react-redux",
          value: "reactRedux",
          description: "Manage the app state with a centralized store",
          checked: true
        },
        {
          name: "Redux",
          value: "redux",
          description:
            "Provides a few helper functions to tie these contracts together",
          checked: true
        },
        {
          name: "react-router",
          value: "reactRouter",
          description: "Structure the app with dynamic pages"
        },
        {
          name: "TypeScript",
          value: "ts",
          short: "TS",
          description: "Add support for the TypeScript language"
        }
      ]
    },
    vue: {
      name: "Vue",
      value: "vue",
      choice: [
        {
          name: "VUEX",
          value: "vuex",
          description: "Manage the app state with a centralized store",
          checked: true
        },
        {
          name: "Router",
          value: "router",
          description: "Structure the app with dynamic pages"
        }
      ]
    }
  };
};

module.exports.createOptions = function(type='vue') {
  const options = [
    {
      type: "input",
      name: "description",
      message: "Please input your project description.",
      default: "description",
      validate(val) {
        return true;
      },
      transformer(val) {
        return val;
      }
    },
    {
      type: "input",
      name: "author",
      message: "Please input your author name.",
      default: "author",
      validate(val) {
        return true;
      },
      transformer(val) {
        return val;
      }
    },
    {
      type: "input",
      name: "version",
      message: "Please input your version.",
      default: "0.0.1",
      validate(val) {
        return true;
      },
      transformer(val) {
        return val;
      }
    }
  ];

  const choices = featureChoice(type).choice;

  const featureOptions = [
    {
      name: type,
      value: type,
      choices
    }
  ];

  featureOptions.concat(options);
  console.log(featureOptions)
  return featureOptions;
};
