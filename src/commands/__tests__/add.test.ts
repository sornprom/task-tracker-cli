import {
  TaskService
} from '../../services/task-service';
import {
  TransferService
} from '../../services/transfer-service';
import {
  commandAdd
} from '../add';

jest.mock('../../services/task-service');
jest.mock('../../services/transfer-service');

describe('commandAdd', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should add a task successfully', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ title: 'Test Task', desc: 'Test Description', due: '25/12/2025' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    const mockTaskService = {
      add: jest.fn().mockReturnValue({ id: 1 }),
    } as unknown as TaskService;
    (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

    commandAdd();

    expect(mockTaskService.add).toHaveBeenCalledWith('Test Task', 'Test Description', '25/12/2025');
    expect(consoleLogSpy).toHaveBeenCalledWith('Task added successfully (ID: 1)');
  });

  it('should show an error if title is missing', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ desc: 'Test Description', due: '25/12/2025' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    commandAdd();

    expect(consoleLogSpy).toHaveBeenCalledWith('Error: title is required');
  });

  it('should show an error if due date has incorrect format', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ title: 'Test Task', due: '2025-12-25' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    commandAdd();

    expect(consoleLogSpy).toHaveBeenCalledWith('Error: dueDate is incorrect format \nformat: DD/MM/YYYY');
  });
});
