import { calculateDueDateLines } from '../calculdate-duedate';
import { TaskDetail, TaskStatus } from '../../models/tasks';
import moment from 'moment';

describe('calculateDueDateLines', () => {
    it('should format tasks with due dates correctly', () => {
        const today = new Date();
        const tomorrow = moment(today).add(1, 'days').format('DD/MM/YYYY');
        const yesterday = moment(today).subtract(1, 'days').format('DD/MM/YYYY');
        const todayFormatted = moment(today).format('DD/MM/YYYY');

        const tasks: TaskDetail[] = [
            { id: 1, title: 'Task 1', status: 'todo' as TaskStatus, createdAt: new Date().toISOString(), dueDate: tomorrow },
            { id: 2, title: 'Task 2', status: 'in-progress' as TaskStatus, createdAt: new Date().toISOString(), dueDate: yesterday },
            { id: 3, title: 'Task 3', status: 'done' as TaskStatus, createdAt: new Date().toISOString() },
            { id: 4, title: 'Task 4', status: 'todo' as TaskStatus, createdAt: new Date().toISOString(), dueDate: todayFormatted },
        ];

        const expectedLines = [
            `#1 [todo] Task 1 (Due in 1 day(s))`,
            `#2 [in-progress] Task 2 (Overdue by 1 day(s))`,
            `#3 [done] Task 3`,
            `#4 [todo] Task 4 (Due in 0 day(s))`,
        ];

        const result = calculateDueDateLines(tasks);
        expect(result).toEqual(expectedLines);
    });
});