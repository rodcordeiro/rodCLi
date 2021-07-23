#!/usr/bin/env node

const program = require('commander');
const { join } = require('path');
const chalk = require("chalk");
const shell = require('shelljs');
const pkg = require(join(__dirname, "..",'package.json'));
const updateNotifier = require('update-notifier');


updateNotifier({pkg}).notify();

const task = require('./Commands/Task')
const teste = require('./Commands/Test')
const make = require('./Commands/Make')
const login = require('./Commands/Login')
const whoami = require('./Commands/whoami')


program
    .version(pkg.version,"-v,--version","Shows program version")
    .allowUnknownOption(false)
    .allowExcessArguments(false);

program.addCommand(task)
program.addCommand(teste)
program.addCommand(make)
program.addCommand(login)
program.addCommand(whoami)

program
    .command('backup')
    .description('Faz um backup dos todos')
    .action(() => {
        shell.mkdir('-p', 'backup');
        const command = shell.exec('cp ./src/Commands/todos.json ./backup/todos.json', { silent: true });
        if (!command.code) {
            console.log(chalk.green('Backup realizado com sucesso! To-dos zerados.'));
        } else {
            console.log(command.stderr);
            console.log(chalk.red('Erro ao realizar backup.'));
        }
    })
    
program.parse(process.argv);
