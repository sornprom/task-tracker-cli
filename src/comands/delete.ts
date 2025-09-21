import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";

export function commandDelete() {
  const transfer = new TransferService()
  const id = Number(transfer.getArg(3));
  if (!id) return console.log('Error: id is required');

  const success = new TaskService(transfer).delete(id);
  console.log(success ? 'Task deleted successfully.' : 'Task not found.');
}