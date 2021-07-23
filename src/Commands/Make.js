const { Command } = require('commander');
const chalk = require("chalk");
const Path = require('path');
const shell = require('shelljs');
const { Console } = require('console');


const make = new Command('make');

make
    .description("Comando de login, utilizado para testar a implementação de funcionalidades")
    .helpOption("-h,--help","todo functionallity")
    .option("-n,--name <name>","Folder name to be created")
    .option("-p,--path <path>","Path to the folder")
    .option("-t,--template <template>","Template to be used with")
    .action(async(options)=>{
        let {name, path} = options;
        name = name ? name : "teste"
        path = path ? Path.resolve(path,name) : Path.resolve("./",name)
        
        shell.mkdir('-p', path);
        console.log(chalk.cyan("Pasta criada"))

        if (options.template){
            switch (options.template) {
                case "node":
                    command = shell.exec(`cd ${path} && npm init -y`, { silent: true });
                    if (!command.code) {
                        console.log(chalk.green(command.stdout));
                    } else {
                        console.log(chalk.red('Erro ao iniciar o projeto.'))
                        console.log(command.stderr);
                    }
                    break;
                case "typescript":
                    command = shell.exec(`cd ${path} && npm init -y`, { silent: true });
                    if (!command.code) {
                        console.log(chalk.green(command.stdout));
                    } else {
                        console.log(chalk.red('Erro ao iniciar o projeto.'))
                        console.log(command.stderr);
                    }
                    command = shell.exec(`cd ${path} && npm install -D typescript ts-node-dev @types/node && npx tsc --init`, { silent: true });
                    if (!command.code) {
                        console.log(chalk.green(command.stdout));
                    } else {
                        console.log(chalk.red('Erro ao iniciar o projeto.'))
                        console.log(command.stderr);
                    }
                    command = shell.exec(`cd ${path} && touch index.ts`, { silent: true });
                    if (!command.code) {
                        console.log(chalk.green(command.stdout));
                    } else {
                        console.log(chalk.red('Erro ao iniciar o projeto.'))
                        console.log(command.stderr);
                    }
                    break;
                default:
                    console.log(chalk.redBright('Template inválido.'))
                    break;
            }
        }


    })

module.exports = make