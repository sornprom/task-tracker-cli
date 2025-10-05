import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";

export function commandDelete() {
  const transfer = new TransferService()
  const { id } = transfer.getFlags('delete');
  if (!id) return console.log('Error: id is required');

  const success = new TaskService(transfer).delete(Number(id));
  console.log(success ? 'Task deleted successfully.' : 'Task not found.');
}