import { TaskDetail, TaskStatus } from "../models/tasks";
import { TransferService } from "./transfer-service";


export class TaskService {

    constructor(private readonly transfer: TransferService) { }

    add(title: string, description?: string, dueDate?: string): TaskDetail {
        const tasks = this.transfer.load()
        const newTask: TaskDetail = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title,
            status: "todo",
            createdAt: new Date().toISOString(),
            description,
            dueDate,
        };
        tasks.push(newTask);
        this.transfer.save(tasks);
        return newTask;
    }

    update(id: number, title?: string, description?: string, dueDate?: string): TaskDetail | null {
        const tasks = this.transfer.load();
        const task = tasks.find(t => t.id === id);
        if (!task) return null;
        if (title) task.title = title;
        if (description) task.description = description;
        if (dueDate) task.dueDate = dueDate;
        this.transfer.save(tasks);
        return task;
    }

    delete(id: number): boolean {
        const tasks = this.transfer.load();
        const filtered = tasks.filter(t => t.id !== id);
        if (filtered.length === tasks.length) return false;
        this.transfer.save(filtered);
        return true;
    }

    mark(id: number, status: TaskStatus): TaskDetail | null {
        const tasks = this.transfer.load();
        const task = tasks.find(t => t.id === id);
        if (!task) return null;
        task.status = status;
        this.transfer.save(tasks);
        return task;
    }

    list(status?: TaskStatus): TaskDetail[] {
        const tasks = this.transfer.load();
        if (status) return tasks.filter(t => t.status === status);
        return tasks;
    }
}