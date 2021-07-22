#!/usr/bin/env node

const program = require('commander');
const { join } = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require("chalk");
const Table = require("cli-table");
const shell = require('shelljs');

const package = require(join(__dirname, "..",'package.json'));
const todosPath = join(__dirname, 'todos.json');

const task = require('./Commands/Task')


program.version(package.version,"-v,--version","Shows program version")
    .allowUnknownOption(false)
    .allowExcessArguments(false);

program.addCommand(task)

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
