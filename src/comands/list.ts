import { TaskStatus } from "../models/tasks";
import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";
import { calculateDueDateLines } from "../utils/calculdate-duedate";

export function commandList() {
  const transfer = new TransferService()
  const status = transfer.getArg(3) as TaskStatus | undefined;
  const tasks = new TaskService(transfer).list(status);
  if (!tasks.length) return console.log('No tasks found.');

  const lines = calculateDueDateLines(tasks)
  lines.forEach(line => { console.log(line) })
}