import { TaskService } from "../services/task-service";

const taskService = new TaskService()

function commandMarkInProgress(args: string[]) {
    const id = Number(args[0]);
    if (!id) return console.log('Error: id is required');

    const task = taskService.mark(id, 'in-progress');
    console.log(task ? `Task #${id} marked as in-progress.` : 'Task not found.');
}

function commandMarkDone(args: string[]) {
    const id = Number(args[0]);
    if (!id) return console.log('Error: id is required');

    const task = taskService.mark(id, 'done');
    console.log(task ? `Task #${id} marked as done.` : 'Task not found.');
}

export { commandMarkInProgress, commandMarkDone }