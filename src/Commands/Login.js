const { Command } = require('commander');
const api = require('../utils/api');
const inquirer = require('inquirer');
const chalk = require("chalk");
const { join } = require('path');
const config = require(join(__dirname,"..","utils","config.js"));
const Spinner = require(join(__dirname,"..","utils","loader.js"));

const spinner = new Spinner();

const login = new Command('auth');
login
    .description("Comando de login, utilizado para testar a implementação de funcionalidades")
    .helpOption("-h,--help","todo functionallity")
    .option("-u, --username [username]","Provides username")
    .action(async (options) => {
        options.username ? console.log(options.username): ""
        const {username} = options.username ? options.username : await inquirer.prompt([
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
        
        spinner.start("Connecting API")

        const response = await api.post('/users/auth',payload).then(response=>{
            spinner.text = "Validating answer"
            return response.data.response
        }).catch(err=>{
            console.log({err},err.response.data);
            spinner.fail(chalk.redBright(err.response.data.error))
        })
        if (response){
            const { token } = response
            config.set({user:{username,token}})
            spinner.succeed("Connected")
        }
        spinner.stop()
    })
module.exports = login


