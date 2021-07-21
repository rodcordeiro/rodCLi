import { program } from 'commander'

const Command = program
    Command.name("project")
        .description("Creates, updates and delete projects")
        .argument("<command>")
        .usage("<command>")
    
    Command
        .command("add [name]")
        .usage("[name]")
        .addHelpText('after',"Creates a new project")
        .description("Creates a new project on the dashboard")
        .action((name)=>{
            console.log(`Criado o projeto ${name}`)
        })

    Command
        .command("delete [id]")
        .usage("[id]")
        .addHelpText('after',"Deletes a project")
        .description("Deletes a project, removing it from dashboard")
        .action((name)=>{
            console.log(`Deletado o projeto ${name}`)
        })

async function cli(){
    try{
        const tasker = program
        tasker.version("1.0.0","-v,--version","Outputs program version")
        .description("Task manager")
        .addCommand(Command)
        .parse(process.argv)
        .allowUnknownOption(false)
        .allowExcessArguments(false);
    }
    catch(err){
        throw new Error(err)
    }
}

cli()