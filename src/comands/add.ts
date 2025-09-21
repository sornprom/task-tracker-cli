import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";
import { validate } from "../utils/validate";

export function commandAdd() {
  const transfer = new TransferService()
  const title = transfer.getArg(3);
  const description = transfer.getArg(4)
  let dueDate: string | undefined
  const dueIndex = process.argv.indexOf('--due')
  
  if (dueIndex !== -1) dueDate = process.argv[dueIndex + 1]
  if (dueDate && !validate.isValidDateFormat(dueDate)) return console.log('Error: dueDate is incorrect format \nformat: DD/MM/YYYY');
  if (!title) return console.log('Error: title is required');
  const task = new TaskService(transfer).add(title, description, dueDate);
  console.log(`Task added successfully (ID: ${task.id})`);
}