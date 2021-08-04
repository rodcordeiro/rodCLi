const { Command } = require('commander');
const { join } = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require("chalk");
const Table = require("cli-table");
const shell = require('shelljs');

const todosPath = join(__dirname, 'todos.json');


const getJson = (path) => {
    const data = fs.existsSync(path) ? fs.readFileSync(path) : [];
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];      
    }
};
const saveJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, '\t'));

const showTodoTable = (data) => {
    const table = new Table({
        head: ['id', 'to-do', 'status'],
        colWidths: [10, 40, 10]
    });
    data.map((todo, index) =>
        table.push(
            [index, todo.title, todo.done ? chalk.green('feito') : 'pendente']
        )
    );
    console.log(table.toString());
}


const task = new Command('task');

task.description("task manager")
.helpOption("-h,--help","todo functionallity")

task
    .command('add [todo]')
    .description('Adiciona um to-do')
    .option('-s, --status [status]', 'Status inicial do to-do')
    .action(async (todo, options) => {
        let answers;
        if (!todo) {
            answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'todo',
                    message: 'Qual é o seu to-do?',
                    validate: value => value ? true : 'Não é permitido um to-do vazio'
                }
            ]);
        }

        const data = getJson(todosPath);
        data.push({
            title: todo || answers.todo,
            done: options.status ? true : false
        });
        saveJson(todosPath, data);
        console.log(`${chalk.cyan("Todo adicionado!")}`)
    });

task
    .command('list')
    .description('Lista os to-dos')
    .action(() => {
        const data = getJson(todosPath);
        showTodoTable(data);
    });


    task
    .command('do <todo>')
    .description('Marca o to-do como feito')
    .action(async (todo) => {
        let answers;
        if (!todo) {
            answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'todo',
                    message: 'Qual o id do to-do?',
                    validate: value => value !== undefined ? true : 'Defina um to-do para ser atualizado!'
                }
            ]);
        }

        const data = getJson(todosPath);
        data[todo].done = true;
        saveJson(todosPath, data);
        console.log(`${chalk.green('To-do salvo com sucesso!')}`);
        showTodoTable(data);
    });

task
    .command('undo <todo>')
    .description('Marca o to-do como não feito')
    .action(async (todo) => {
        let answers;
        if (!todo) {
            answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'todo',
                    message: 'Qual o id do to-do?',
                    validate: value => value ? true : 'Defina um to-do para ser atualizado!'
                }
            ]);
        }

        const data = getJson(todosPath);
        data[todo].done = false;
        saveJson(todosPath, data);
        console.log(`${chalk.green('To-do salvo com sucesso!')}`);
        showTodoTable(data);
    });


module.exports = task;
