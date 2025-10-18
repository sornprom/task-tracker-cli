import { commandDelete } from '../delete';
import { TaskService } from '../../services/task-service';
import { TransferService } from '../../services/transfer-service';

jest.mock('../../services/task-service');
jest.mock('../../services/transfer-service');

describe('commandDelete', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should delete a task successfully', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ id: '1' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    const mockTaskService = {
      delete: jest.fn().mockReturnValue(true),
    } as unknown as TaskService;
    (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

    commandDelete();

    expect(mockTaskService.delete).toHaveBeenCalledWith(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Task deleted successfully.');
  });

  it('should show an error if id is missing', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({}),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    commandDelete();

    expect(consoleLogSpy).toHaveBeenCalledWith('Error: id is required');
  });

  it('should show a message if task is not found', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ id: '1' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    const mockTaskService = {
      delete: jest.fn().mockReturnValue(false),
    } as unknown as TaskService;
    (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

    commandDelete();

    expect(mockTaskService.delete).toHaveBeenCalledWith(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Task not found.');
  });
});
