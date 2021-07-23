const { Command } = require('commander');
const api = require('../utils/api');
const inquirer = require('inquirer');
const chalk = require("chalk");
const { join } = require('path');
const config = require(join(__dirname,"..","utils","config.js"));
const Spinner = require(join(__dirname,"..","utils","loader.js"));

const spinner = new Spinner();
const whoami = new Command('whoami');
whoami
    .description("Who am I? command.")
    .helpOption("-h,--help","Shows help")
    .action(async (options) => {
        spinner.start("Retrieving configuration")
        const info = config.get("user")
        spinner.succeed(`Logged as ${info.username}`)
    })
module.exports = whoami
