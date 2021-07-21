import { program } from 'commander'

const Command = program

    Command.name("projects")
        .description("Creates, updates and delete projects")
        .alias("project")
        .command("project <name>")
        .action((name)=>{
            console.log(name)
        })
        .helpOption("-h","--help")
        .usage("project <name>")

