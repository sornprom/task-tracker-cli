import { TaskService } from '../task-service';
import { TransferService } from '../transfer-service';
import { TaskDetail, TaskStatus } from '../../models/tasks';

jest.mock('../transfer-service');

const mockedTransferService = TransferService as jest.MockedClass<typeof TransferService>;

describe('TaskService', () => {
    let taskService: TaskService;
    let transferService: jest.Mocked<TransferService>;
    let tasks: TaskDetail[];

    beforeEach(() => {
        tasks = [
            { id: 1, title: 'Task 1', status: 'todo', createdAt: new Date().toISOString() },
            { id: 2, title: 'Task 2', status: 'in-progress', createdAt: new Date().toISOString() },
        ];
        
        mockedTransferService.mockImplementation(() => {
            return {
                load: jest.fn().mockReturnValue(tasks),
                save: jest.fn(),
                getArg: jest.fn(),
                getFlags: jest.fn(),
                dataFile: ''
            } as unknown as TransferService;
        });

        transferService = new mockedTransferService() as jest.Mocked<TransferService>;
        taskService = new TaskService(transferService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        it('should add a new task', () => {
            const newTask = taskService.add('New Task', 'Description', '2025-12-31');
            expect(newTask.title).toBe('New Task');
            expect(newTask.description).toBe('Description');
            expect(newTask.dueDate).toBe('2025-12-31');
            expect(newTask.status).toBe('todo');
            expect(transferService.save).toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('should update an existing task', () => {
            const updatedTask = taskService.update(1, 'Updated Task', 'Updated Description');
            expect(updatedTask?.title).toBe('Updated Task');
            expect(updatedTask?.description).toBe('Updated Description');
            expect(transferService.save).toHaveBeenCalled();
        });

        it('should return null if task not found', () => {
            const updatedTask = taskService.update(99, 'Updated Task');
            expect(updatedTask).toBeNull();
        });
    });

    describe('delete', () => {
        it('should delete a task', () => {
            const result = taskService.delete(1);
            expect(result).toBe(true);
            expect(transferService.save).toHaveBeenCalledWith(tasks.filter(t => t.id !== 1));
        });

        it('should return false if task not found', () => {
            const result = taskService.delete(99);
            expect(result).toBe(false);
        });
    });

    describe('mark', () => {
        it('should mark a task with a new status', () => {
            const markedTask = taskService.mark(1, 'done');
            expect(markedTask?.status).toBe('done');
            expect(transferService.save).toHaveBeenCalled();
        });

        it('should return null if task not found', () => {
            const markedTask = taskService.mark(99, 'done');
            expect(markedTask).toBeNull();
        });
    });

    describe('list', () => {
        it('should list all tasks', () => {
            const allTasks = taskService.list();
            expect(allTasks).toEqual(tasks);
        });

        it('should list tasks filtered by status', () => {
            const todoTasks = taskService.list('todo');
            expect(todoTasks).toEqual([tasks[0]]);
        });
    });
});