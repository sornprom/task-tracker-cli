import { commandAdd } from "./comands/add";
import { commandDelete } from "./comands/delete";
import { commandList } from "./comands/list";
import { commandMarkDone, commandMarkInProgress } from "./comands/mark";
import { commandUpdate } from "./comands/update";

const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1);

switch (command) {
    case 'add':
        commandAdd(); 
        break;
    case 'list':
        commandList(); 
        break;
    case 'update':
        commandUpdate(commandArgs); 
        break;
    case 'delete':
        commandDelete(commandArgs); 
        break;
    case 'mark-in-progress':
        commandMarkInProgress(commandArgs); 
        break;
    case 'mark-done':
        commandMarkDone(commandArgs); 
        break;
    default:
        console.log('Available commands: add, list, update, delete, mark-in-progress, mark-done');
}