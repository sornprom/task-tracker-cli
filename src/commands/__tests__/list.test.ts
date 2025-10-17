import { commandList } from '../list';
import { TaskService } from '../../services/task-service';
import { TransferService } from '../../services/transfer-service';
import { calculateDueDateLines } from '../../utils/calculdate-duedate';
import { TaskStatus } from '../../models/tasks';

jest.mock('../../services/task-service');
jest.mock('../../services/transfer-service');
jest.mock('../../utils/calculdate-duedate');

describe('commandList', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should list all tasks', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({}),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    const mockTasks = [{ id: 1, title: 'Test Task' }];
    const mockTaskService = {
      list: jest.fn().mockReturnValue(mockTasks),
    } as unknown as TaskService;
    (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

    (calculateDueDateLines as jest.Mock).mockReturnValue(['line 1', 'line 2']);

    commandList();

    expect(mockTaskService.list).toHaveBeenCalledWith(undefined);
    expect(calculateDueDateLines).toHaveBeenCalledWith(mockTasks);
    expect(consoleLogSpy).toHaveBeenCalledWith('line 1');
    expect(consoleLogSpy).toHaveBeenCalledWith('line 2');
  });

  it('should list tasks with a specific status', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ status: 'todo' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    const mockTasks = [{ id: 1, title: 'Test Task', status: 'todo' }];
    const mockTaskService = {
      list: jest.fn().mockReturnValue(mockTasks),
    } as unknown as TaskService;
    (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

    (calculateDueDateLines as jest.Mock).mockReturnValue(['line 1']);

    commandList();

    expect(mockTaskService.list).toHaveBeenCalledWith('todo');
    expect(calculateDueDateLines).toHaveBeenCalledWith(mockTasks);
    expect(consoleLogSpy).toHaveBeenCalledWith('line 1');
  });

  it('should show a message if no tasks are found', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({}),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    const mockTaskService = {
      list: jest.fn().mockReturnValue([]),
    } as unknown as TaskService;
    (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

    commandList();

    expect(consoleLogSpy).toHaveBeenCalledWith('No tasks found.');
  });

  it('should show an error if status is not allowed', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ status: 'invalid-status' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    commandList();

    expect(consoleLogSpy).toHaveBeenCalledWith('Status not allowed');
  });
});
