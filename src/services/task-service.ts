import fs from "fs";
import { TaskDetail, TaskStatus } from "../models/tasks";

const dataFile = 'tasks.json';

export class TaskService {

    load(): TaskDetail[] {
        if (!fs.existsSync(dataFile)) return [];
        return JSON.parse(fs.readFileSync(dataFile, 'utf-8')) as TaskDetail[];
    }

    save(tasks: TaskDetail[]): void {
        fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
    }

    add(title: string, description?: string): TaskDetail {
        const tasks = this.load();
        const newTask: TaskDetail = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title,
            status: "todo",
            createdAt: new Date().toISOString(),
            description
        };
        tasks.push(newTask);
        this.save(tasks);
        return newTask;
    }

    update(id: number, title?: string, description?: string): TaskDetail | null {
        const tasks = this.load();
        const task = tasks.find(t => t.id === id);
        if (!task) return null;
        if (title) task.title = title;
        if (description) task.description = description;
        this.save(tasks);
        return task;
    }

    delete(id: number): boolean {
        const tasks = this.load();
        const filtered = tasks.filter(t => t.id !== id);
        if (filtered.length === tasks.length) return false;
        this.save(filtered);
        return true;
    }

    mark(id: number, status: TaskStatus): TaskDetail | null {
        const tasks = this.load();
        const task = tasks.find(t => t.id === id);
        if (!task) return null;
        task.status = status;
        this.save(tasks);
        return task;
    }

    list(status?: TaskStatus): TaskDetail[] {
        const tasks = this.load();
        if (status) return tasks.filter(t => t.status === status);
        return tasks;
    }
}