import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";
import { validate } from "../utils/validate";

export function commandAdd() {
  const transfer = new TransferService()
  const params = transfer.getFlags('add');

  if (params.due && !validate.isValidDateFormat(params.due)) return console.log('Error: dueDate is incorrect format \nformat: DD/MM/YYYY');
  if (!params.title) return console.log('Error: title is required');
  const task = new TaskService(transfer).add(params.title, params.desc, params.due);
  console.log(`Task added successfully (ID: ${task.id})`);
}