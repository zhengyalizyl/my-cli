const spawn = require("cross-spawn");
module.export.executeCommand = async function(command, args, options = {}) {
  const child = spawn(command, args, { stdio: "inherit", ...options });
  try {
    let res = await child.on("close");
    if (res.code !== 0) {
      throw {
        command: `${command} ${args.join(" ")}`
      };
    }
  } catch (error) {
    throw {
      command: `${command} ${args.join(" ")}`
    };
  }
};
