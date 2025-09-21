import { TaskStatus } from "../models/tasks";
import { TaskService } from "../services/task-service";

export function commandList(args: string[]) {
  const status = args[0] as TaskStatus | undefined;
  const tasks = new TaskService().list(status);
  if (!tasks.length) return console.log('No tasks found.');

  tasks.forEach(t => {
    console.log(`#${t.id} [${t.status}] ${t.title}${t.description ? ' - ' + t.description : ''}`);
  });
}