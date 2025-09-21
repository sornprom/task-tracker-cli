import { TaskService } from "../services/task-service";

export function commandDelete(args: string[]) {
  const id = Number(args[0]);
  if (!id) return console.log('Error: id is required');

  const success = new TaskService().delete(id);
  console.log(success ? 'Task deleted successfully.' : 'Task not found.');
}