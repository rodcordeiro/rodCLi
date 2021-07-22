const { Command } = require('commander');
const api = require('../utils/api');
const inquirer = require('inquirer');
const chalk = require("chalk");
const { join } = require('path');
const fs = require('fs');

const config = join(__dirname, '..',"config.json");

const saveJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, '\t'));

const teste = new Command('test');

teste
    .description("Comando de teste, utilizado para testar a implementação de funcionalidades")
    .helpOption("-h,--help","todo functionallity")
    .action(async () => {
        
        const {username} = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'username',
                    message: 'Please type your username',
                    validate: value => value ? true : 'Please enter your name'
                }
            ])
        const { password } = await inquirer.prompt([
                {
                    type: 'password',
                    name: 'password',
                    message: 'Please enter your password',
                    validate: value => value ? true : 'You must enter your password'
                }
            ])
        const payload = {
            username,
            password,
        }
        const response = await api.post('/users/auth',payload).then(response=>{
            return response.data.response
        }).catch(err=>{
            console.log(chalk.redBright(err))
        })
        if (response){
            const { token } = response
            saveJson(config,{user:{username,token}})
            console.log(chalk.cyan("Logged"))
        }
    })
module.exports = teste


