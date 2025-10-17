import { TransferService } from '../transfer-service';
import fs from 'fs';
import path from 'path';
import { Command, TaskDetail, TaskStatus } from '../../models/tasks';

jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('TransferService', () => {
    let transferService: TransferService;
    const tasks: TaskDetail[] = [
        { id: 1, title: 'Task 1', status: 'todo' as TaskStatus, createdAt: new Date().toISOString() },
        { id: 2, title: 'Task 2', status: 'in-progress' as TaskStatus, createdAt: new Date().toISOString() },
    ];
    const dataFile = path.join(process.cwd(), 'tasks.json');

    beforeEach(() => {
        transferService = new TransferService();
        transferService.dataFile = dataFile;
        mockedFs.existsSync.mockReturnValue(true);
        mockedFs.readFileSync.mockReturnValue(JSON.stringify(tasks));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('load', () => {
        it('should load tasks from the data file', () => {
            const loadedTasks = transferService.load();
            expect(mockedFs.readFileSync).toHaveBeenCalledWith(dataFile, 'utf-8');
            expect(loadedTasks).toEqual(tasks);
        });

        it('should return an empty array if the data file does not exist', () => {
            mockedFs.existsSync.mockReturnValue(false);
            const loadedTasks = transferService.load();
            expect(loadedTasks).toEqual([]);
        });
    });

    describe('save', () => {
        it('should save tasks to the data file', () => {
            transferService.save(tasks);
            expect(mockedFs.writeFileSync).toHaveBeenCalledWith(dataFile, JSON.stringify(tasks, null, 2));
        });
    });

    describe('getArg', () => {
        it('should return the argument at the specified index', () => {
            process.argv = ['node', 'script', 'arg1', 'arg2'];
            expect(transferService.getArg(2)).toBe('arg1');
            expect(transferService.getArg(3)).toBe('arg2');
        });
    });

    describe('getFlags', () => {
        const originalArgv = process.argv;

        afterEach(() => {
            process.argv = originalArgv;
        });

        it('should parse flags for the "add" command', () => {
            process.argv = ['node', 'script', 'add', '-t', 'New Task', '--desc', 'Description', '--due', '2025-12-31'];
            const flags = transferService.getFlags('add' as Command);
            expect(flags).toEqual({
                title: 'New Task',
                desc: 'Description',
                due: '2025-12-31',
            });
        });

        it('should parse flags for the "update" command', () => {
            process.argv = ['node', 'script', 'update', '-i', '1', '--title', 'Updated Task'];
            const flags = transferService.getFlags('update' as Command);
            expect(flags).toEqual({
                id: 1,
                title: 'Updated Task',
            });
        });

        it('should handle unknown flags', () => {
            process.argv = ['node', 'script', 'add', '--unknown-flag'];
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
            const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
            transferService.getFlags('add' as Command);
            expect(consoleWarnSpy).toHaveBeenCalledWith('Warning: Unknown flag "--unknown-flag"');
            expect(processExitSpy).toHaveBeenCalledWith(1);
            consoleWarnSpy.mockRestore();
            processExitSpy.mockRestore();
        });

        it('should handle disallowed flags for a command', () => {
            process.argv = ['node', 'script', 'add', '--status', 'done'];
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
            const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
            transferService.getFlags('add' as Command);
            expect(consoleWarnSpy).toHaveBeenCalledWith('Warning: Unknown or disallowed flag "--status" for command "add"');
            expect(processExitSpy).toHaveBeenCalledWith(1);
            consoleWarnSpy.mockRestore();
            processExitSpy.mockRestore();
        });
    });
});