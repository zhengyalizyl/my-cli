#!/usr/bin/env node
const program=require('commander');
const chalk=require('chalk');
const Ora=require('ora');
const spawn=require('cross-spawn');
const didYouMean=require('didyoumean');
const semver=require('semver');

 const  requiredNodeVersion=require('../package.json').engines.node;//require node version
// Setting edit distance to 60% of the input string's length
didYouMean.threshold = 0.6;

//判断node版本号是够满足要求
function checkNodeVersion(wanted,id){
    const unsupportedNodeVersion=!semver.satisfies(process.version,wanted);
    if(unsupportedNodeVersion){
      console.log(chalk.yellow(
        `You are using Node ${process.version} ,but this version of ${id}\n\n` +
        `Please update to Node ${wanted} or higher for a better, fully supported experience.\n`
      ));
      process.exit(1);
    }
}

checkNodeVersion(requiredNodeVersion,'my-cli/cli');

//执行命令行
program.command("init <project-directory>")
       .description('init project')
       .usage(`${chalk.green('<project-directory>')}`)
       .action(name=>{
         console.log('init'+name);
         require('../lib/init').create(name)
       })
       .on('--help',()=>{
         console.log()
         console.log(
          `    Only ${chalk.green('<project-directory>')} is required.`
         )
         console.log()
       })

   
// add some useful info on help
 program.on('--help',()=>{
   console.log();
   console.log()
   console.log(`Run ${chalk.cyan('mycli <command> --help')} for detailed usage of given command.`)
   console.log()
 })      