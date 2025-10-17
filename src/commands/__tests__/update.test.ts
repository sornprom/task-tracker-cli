import { commandUpdate } from '../update';
import { TaskService } from '../../services/task-service';
import { TransferService } from '../../services/transfer-service';

jest.mock('../../services/task-service');
jest.mock('../../services/transfer-service');

describe('commandUpdate', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should update a task successfully', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ id: '1', title: 'New Title', desc: 'New Desc', due: '25/12/2025' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    const mockTaskService = {
      update: jest.fn().mockReturnValue({ id: 1 }),
    } as unknown as TaskService;
    (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

    commandUpdate();

    expect(mockTaskService.update).toHaveBeenCalledWith('1', 'New Title', 'New Desc', '25/12/2025');
    expect(consoleLogSpy).toHaveBeenCalledWith('Task updated successfully.');
  });

  it('should show an error if id is missing', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ title: 'New Title' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    commandUpdate();

    expect(consoleLogSpy).toHaveBeenCalledWith('Error: id is required');
  });

  it('should show an error if due date has incorrect format', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ id: '1', due: '2025-12-25' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    commandUpdate();

    expect(consoleLogSpy).toHaveBeenCalledWith('Error: dueDate is incorrect format \nformat: DD/MM/YYYY');
  });

  it('should show a message if task is not found', () => {
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ id: '1' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

    const mockTaskService = {
      update: jest.fn().mockReturnValue(null),
    } as unknown as TaskService;
    (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

    commandUpdate();

    expect(mockTaskService.update).toHaveBeenCalledWith('1', undefined, undefined, undefined);
    expect(consoleLogSpy).toHaveBeenCalledWith('Task not found.');
  });
});
