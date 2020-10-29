1.安装依赖
commander 命令行工具
download-git-repo git 仓库代码下载
chalk 命令行输出样式美化
inquirer 命令行交互
ora 命令行加载中效果
didyoumean 脚本命令匹配
fs-extra fs 的替代品。
log-symbols 日志着色
semver 语义化日志控制
validate-npm-package-name 校验包名
cross-spawn 可以在调用 spawn 函数时，自动根据当前的运行平台，来决定是否生成一个 shell 来执行所给的命令

npm i commander download-git-repo  chalk inquirer ora didyoumean fs-extra log-symbols semver validate-npm-package-name cross-spawn -S

2.新建bin/index.js

3.在package.json里面配置
  "bin":{
      "mycli":"./bin/index.js"
  },
   