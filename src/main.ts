import { commandAdd } from "./commands/add";
import { commandDelete } from "./commands/delete";
import { commandList } from "./commands/list";
import { commandMarkDone, commandMarkInProgress } from "./commands/mark";
import { commandUpdate } from "./commands/update";
import { resolveCommand } from "./utils/resolve-command";

const args = process.argv.slice(2);
const rawCommand = args[0];
const command = resolveCommand(rawCommand);;

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
        console.log('Available taskminal commands: add, list, update, delete, mark-in-progress, mark-done');
}