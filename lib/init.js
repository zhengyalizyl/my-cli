const path = require("path");
const fs = require("fs-extra");
const Ora = require("ora");
const inquirer = require("inquirer");
const validateNpmPackageName = require("validate-npm-package-name");
const lohSymbols = require("log-symbols");
const { RemoteUrl } = require("./utils/const");
const { download } = require("./download");
const { executeCommand } = require("./utils/executeSpwan");

module.exports.create = async function(projectName) {
  const cwd = process.cwd(); //当前项目的根目录
  const targetDir = path.resolve(cwd, projectName);
  const name = path.relative(cwd, projectName);

  //先验证project name的命名规范
  const result = validateNpmPackageName(name);
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`));
    result.errors &&
      result.errors.forEach(err => {
        console.error(chalk.red.dim("Error: " + err));
      });
    result.warnings &&
      result.warnings.forEach(warn => {
        console.error(chalk.red.dim("Warning: " + warn));
      });
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    const {} = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: `Target directory ${chalk.cyan(
          targetDir
        )} already exists. Pick an action:`,
        choices: [
          { name: "Overwrite", value: "overwrite" },
          { name: "Cancel", value: false }
        ]
      }
    ]);
    if (!action) {
      return;
    } else if (action === "overwrite") {
      console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
      await fs.remove(targetDir);
    }
  }

  const {
    bolierplateType,
    author,
    description,
    version
  } = await inquirer.prompt([
    {
      name: "bolierplateType",
      type: "list",
      default: "Vue",
      choices: [
        {
          name: "Vue",
          value: "vue"
        },
        {
          name: "React",
          value: "react"
        }
      ],
      message: "Select the boilerplate type."
    },
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
  ]);

  const remoteUrl = RemoteUrl[bolierplateType];
  console.log(
    logSymbols.success,
    chalk.green(
      `Creating template of project ${bolierplateType} in ${targetDir}`
    )
  );

  const spinner = new Ora({
    text: `🚀Download template from ${remoteUrl}\n`
  });

  spinner.start();
  try {
    await download(remoteUrl, projectName);
    fs.readFile(`./${projectName}/package.json`, "utf8", (err, data) => {
      if (err) {
        spinner.stop();
        console.log(
          lohSymbols.error,
          chalk.green(`fail to read ${projectName} file`)
        );
        return;
      }
      const packageJson = Json.parse(data);
      packageJson = {
        ...packageJson,
        name: projectName,
        description,
        author,
        version
      };
      let updatePackageJson = JSON.stringify(packageJson, null, 2);
      fs.writeFile(
        `./${projectName}/package.json`,
        updatePackageJson,
        "utf8",
        async error => {
          spinner.stop();
          if (error) {
            console.log(
              lohSymbols.error,
              chalk.red(`fail to write ${projectName} file`)
            );
            process.exit(1);
            return;
          }

          console.log(
            lohSymbols.success,
            chalk.green(
              `Successfully created project template of ${bolierplateType}\n`
            )
          );

          try {
            await executeCommand("npm", ["install", "--save"], {
              cwd: `./${projectName}`
            });

            console.log(
              lohSymbols.success,
              chalk.green(`安装完成：
       To get Start:
       ================
       cd ${projectName}
       npm run serve
       ================
       `)
            );
          } catch (reason) {
            if (reason.command) {
              console.log(`  ${chalk.cyan(reason.command)} has failed.`);
            } else {
              console.log(
                chalk.red("Unexpected error. Please report it as a bug:")
              );
              console.log(reason);
            }
          }
          process.exit(1);
        }
      );
    });
  } catch (error) {
    console.log(lohSymbols.error, error);
    spinner.fail(
      chalk.red("Sorry, it must be something error,please check it out. \n")
    );
    process.exit(1);
  }
};
