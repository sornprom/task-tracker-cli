import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";
import { validate } from "../utils/validate";

export function commandUpdate() {
  const transfer = new TransferService();
  const { id, title, desc, due } = transfer.getFlags('update')
  if (!id) return console.log('Error: id is required');

  if (due && !validate.isValidDateFormat(due)) {
    return console.log('Error: dueDate is incorrect format \nformat: DD/MM/YYYY');
  }

  const task = new TaskService(transfer).update(id, title, desc, due);
  console.log(task ? 'Task updated successfully.' : 'Task not found.');
}