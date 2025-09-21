import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";

export function commandUpdate(args: string[]) {
  const transfer = new TransferService()
  const id = Number(args[0]);
  const title = args[1];
  const description = args[2];
  if (!id) return console.log('Error: id is required');

  const task = new TaskService(transfer).update(id, title, description);
  console.log(task ? 'Task updated successfully.' : 'Task not found.');
}