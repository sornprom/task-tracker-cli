import { commandMarkInProgress, commandMarkDone } from '../mark';
import { TaskService } from '../../services/task-service';
import { TransferService } from '../../services/transfer-service';

jest.mock('../../services/task-service');
jest.mock('../../services/transfer-service');

describe('commandMark', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const mockTransferService = {
      getFlags: jest.fn().mockReturnValue({ id: '1' }),
    } as unknown as TransferService;
    (TransferService as jest.Mock).mockImplementation(() => mockTransferService);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe('commandMarkInProgress', () => {
    it('should mark a task as in-progress', () => {
      const mockTaskService = {
        mark: jest.fn().mockReturnValue({ id: 1 }),
      } as unknown as TaskService;
      (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

      commandMarkInProgress();

      expect(mockTaskService.mark).toHaveBeenCalledWith(1, 'in-progress');
      expect(consoleLogSpy).toHaveBeenCalledWith('Task #1 marked as in-progress.');
    });

    it('should show an error if id is missing', () => {
      const mockTransferService = {
        getFlags: jest.fn().mockReturnValue({}),
      } as unknown as TransferService;
      (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

      commandMarkInProgress();

      expect(consoleLogSpy).toHaveBeenCalledWith('Error: id is required');
    });

    it('should show a message if task is not found', () => {
      const mockTaskService = {
        mark: jest.fn().mockReturnValue(null),
      } as unknown as TaskService;
      (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

      commandMarkInProgress();

      expect(mockTaskService.mark).toHaveBeenCalledWith(1, 'in-progress');
      expect(consoleLogSpy).toHaveBeenCalledWith('Task not found.');
    });
  });

  describe('commandMarkDone', () => {
    it('should mark a task as done', () => {
      const mockTaskService = {
        mark: jest.fn().mockReturnValue({ id: 1 }),
      } as unknown as TaskService;
      (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

      commandMarkDone();

      expect(mockTaskService.mark).toHaveBeenCalledWith(1, 'done');
      expect(consoleLogSpy).toHaveBeenCalledWith('Task #1 marked as done.');
    });

    it('should show an error if id is missing', () => {
      const mockTransferService = {
        getFlags: jest.fn().mockReturnValue({}),
      } as unknown as TransferService;
      (TransferService as jest.Mock).mockImplementation(() => mockTransferService);

      commandMarkDone();

      expect(consoleLogSpy).toHaveBeenCalledWith('Error: id is required');
    });

    it('should show a message if task is not found', () => {
      const mockTaskService = {
        mark: jest.fn().mockReturnValue(null),
      } as unknown as TaskService;
      (TaskService as jest.Mock).mockImplementation(() => mockTaskService);

      commandMarkDone();

      expect(mockTaskService.mark).toHaveBeenCalledWith(1, 'done');
      expect(consoleLogSpy).toHaveBeenCalledWith('Task not found.');
    });
  });
});
