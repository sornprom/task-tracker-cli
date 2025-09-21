import path from "path";
import { TaskDetail } from "../models/tasks";
import fs from 'fs'

export class TransferService {
    dataFile: string = path.join(process.cwd(), 'tasks.json');

    load(): TaskDetail[] {
        if (!fs.existsSync(this.dataFile)) return [];
        return JSON.parse(fs.readFileSync(this.dataFile, 'utf-8')) as TaskDetail[];
    }

    save(tasks: TaskDetail[]): void {
        fs.writeFileSync(this.dataFile, JSON.stringify(tasks, null, 2));
    }

    getArg = (index: number) => process.argv[index]
}