const { Command } = require('commander');
const Path = require('path');
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
        }, 1500);
        setTimeout(() => {
            spinner.color = 'green';
            spinner.text = 'finished';
        }, 3000);
        setTimeout(() => {
            spinner.succeed("Lodaded")
            console.log({
                "./":Path.resolve("./"),
                "__dirname":Path.resolve(__dirname,"./")
            })
        }, 5000);
        setTimeout(() => {
            spinner.stop();
        }, 8000);


        

        

    })

module.exports = test