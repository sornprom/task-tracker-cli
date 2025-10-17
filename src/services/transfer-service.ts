import path from "path";
import { Command, TaskDetail } from "../models/tasks";
import fs from 'fs'

export interface Flags {
    id?: number;
    title?: string;
    desc?: string;
    due?: string;
    status?: string;
    keyword?: string;
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
            list: ['status','keyword'],
            update: ['title', 'desc', 'due', 'id'],
            delete: ['id'],
            'mark-in-progress': ['id'],
            'mark-done': ['id'],
        };

        const allowedFlags = commandFlags[command as Command];

        const flagMap: Record<string, FlagName> = {
            '--id': 'id', '-i': 'id',
            '--title': 'title', '-t': 'title',
            '--desc': 'desc', '--description': 'desc', '-d': 'desc',
            '--due': 'due', '-D': 'due',
            '--status': 'status', '-s': 'status',
            '--keyword': 'keyword', '-k': 'keyword'

        };

        const flags: Flags = {};
        const argv = process.argv.slice(2);

        let i = 0;
        while (i < argv.length) {
            const arg = argv[i];

            if (!arg.startsWith('-')) {
                i++;
                continue;
            }

            const flagName = flagMap[arg];
            if (!flagName) {
                console.warn(`Warning: Unknown flag "${arg}"`);
                process.exit(1);
            }

            if (!allowedFlags.includes(flagName)) {
                console.warn(`Warning: Unknown or disallowed flag "${arg}" for command "${command}"`);
                process.exit(1);
            }

            const next = argv[i + 1];
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
                case 'keyword':
                    flags.keyword = next;
                    break;
            }
            i += 2;
        }
        return flags;
    }
}