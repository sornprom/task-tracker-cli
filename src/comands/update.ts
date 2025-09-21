import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";
import { validate } from "../utils/validate";

export function commandUpdate() {
  const transfer = new TransferService();
  const id = Number(transfer.getArg(3));
  if (!id) return console.log('Error: id is required');
  const title = transfer.getArg(4);        
  const description = transfer.getArg(5);  
  let dueDate: string | undefined;
  const dueIndex = process.argv.indexOf('--due');
  if (dueIndex !== -1) dueDate = process.argv[dueIndex + 1];

  if (dueDate && !validate.isValidDateFormat(dueDate)) {
    return console.log('Error: dueDate is incorrect format \nformat: DD/MM/YYYY');
  }

  const task = new TaskService(transfer).update(id, title, description, dueDate);
  console.log(task ? 'Task updated successfully.' : 'Task not found.');
}