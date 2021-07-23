const { Command } = require('commander');
const Path = require('path');
const config = require('../utils/config')
const Spinner = require('../utils/loader');
const spinner = new Spinner();


const test = new Command('test');

test
    .description("Comando de login, utilizado para testar a implementação de funcionalidades")
    .helpOption("-h,--help","todo functionallity")
    .action(async () =>{
        
        spinner.start('Loading unicorns');
        setTimeout(() => {
            spinner.color = 'yellow';
            spinner.text = 'Loading rainbows';
        }, 3000);
        setTimeout(() => {
            spinner.color = 'green';
            spinner.text = 'finished';
        }, 6000);
        setTimeout(() => {
            spinner.succeed("Loaded")
        }, 9000);
        setTimeout(() => {
            spinner.stop();
        }, 11000);


        

        

    })

module.exports = test