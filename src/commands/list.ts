import { TaskStatus } from "../models/tasks";
import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";
import { calculateDueDateLines } from "../utils/calculdate-duedate";
import { validate } from "../utils/validate";

export function commandList() {
  const transfer = new TransferService();
  const { status, keyword } = transfer.getFlags('list');
  if (status && !validate.isAllowStatus(status)) {
    return console.log('Status not allowed');
  }
  const tasks = new TaskService(transfer).list(status as TaskStatus | undefined, keyword);
  if (!tasks.length) return console.log('No tasks found.');

  const lines = calculateDueDateLines(tasks);
  lines.forEach(line => { console.log(line) });
}