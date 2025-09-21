import path from "path";
import { Command, TaskDetail } from "../models/tasks";
import fs from 'fs'

export interface Flags {
    id?: number;
    title?: string;
    desc?: string;
    due?: string;
    status?: string;
}

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

    getFlags(command: Command): Flags {
        type FlagName = keyof Flags;
        const commandFlags: Record<Command, FlagName[]> = {
            add: ['id', 'title', 'desc', 'due'],
            list: ['status'],
            update: ['title', 'desc', 'due'],
            delete: ['id'],
            'mark-in-progress': ['id'],
            'mark-done': ['id'],
        };

        const allowedFlags = commandFlags[command as Command];

        const flags: Flags = {};
        const argv = process.argv.slice(2);

        let i = 0;
        while (i < argv.length) {
            const arg = argv[i];

            if (!arg.startsWith('--')) {
                i++;
                continue;
            }

            const flagName = arg.slice(2) as FlagName;
            const next = argv[i + 1];

            if (!allowedFlags.includes(flagName)) {
                console.warn(`Warning: Unknown or disallowed flag "${arg}" for command "${command}"`);
                i += 2;
                continue;
            }

            switch (flagName) {
                case 'id':
                    flags.id = next ? Number(next) : undefined;
                    break;
                case 'title':
                    flags.title = next;
                    break;
                case 'desc':
                    flags.desc = next;
                    break;
                case 'due':
                    flags.due = next;
                    break;
                case 'status':
                    flags.status = next;
                    break;
            }
            i += 2;
        }
        return flags;
    }
}