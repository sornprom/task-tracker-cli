import { TaskService } from "../services/task-service";

export function commandAdd(args: string[]) {
  const title = args[0];
  const description = args[1];
  if (!title) return console.log('Error: title is required');
  const task = new TaskService().add(title, description);
  console.log(`Task added successfully (ID: ${task.id})`);
}