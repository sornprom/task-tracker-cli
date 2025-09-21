import { commandAdd } from "./comands/add";
import { commandDelete } from "./comands/delete";
import { commandList } from "./comands/list";
import { commandMarkDone, commandMarkInProgress } from "./comands/mark";
import { commandUpdate } from "./comands/update";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'add':
        commandAdd(); 
        break;
    case 'list':
        commandList(); 
        break;
    case 'update':
        commandUpdate(); 
        break;
    case 'delete':
        commandDelete(); 
        break;
    case 'mark-in-progress':
        commandMarkInProgress(); 
        break;
    case 'mark-done':
        commandMarkDone(); 
        break;
    default:
        console.log('Available commands: add, list, update, delete, mark-in-progress, mark-done');
}