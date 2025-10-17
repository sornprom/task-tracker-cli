import { TaskService } from "../services/task-service";
import { TransferService } from "../services/transfer-service";

function commandMarkInProgress() {
    const transfer = new TransferService
    const taskService = new TaskService(transfer)
    const { id } = transfer.getFlags('mark-in-progress')
    if (!id) return console.log('Error: id is required');

    const task = taskService.mark(Number(id), 'in-progress');
    console.log(task ? `Task #${id} marked as in-progress.` : 'Task not found.');
}

function commandMarkDone() {
    const transfer = new TransferService
    const taskService = new TaskService(transfer)
    const { id } = transfer.getFlags('mark-done');
    if (!id) return console.log('Error: id is required');

    const task = taskService.mark(Number(id), 'done');
    console.log(task ? `Task #${id} marked as done.` : 'Task not found.');
}

export { commandMarkInProgress, commandMarkDone }