"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var Command = commander_1.program;
Command.name("projects")
    .description("Creates, updates and delete projects")
    .alias("project")
    .command("project <name>")
    .action(function (name) {
    console.log(name);
})
    .helpOption("-h", "--help")
    .usage("project <name>");
