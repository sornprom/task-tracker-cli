import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";

export function commandDelete(args: string[]) {
  const transfer = new TransferService()
  const id = Number(args[0]);
  if (!id) return console.log('Error: id is required');

  const success = new TaskService(transfer).delete(id);
  console.log(success ? 'Task deleted successfully.' : 'Task not found.');
}