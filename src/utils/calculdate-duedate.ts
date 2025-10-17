import moment from "moment";
import { TaskDetail } from "../models/tasks";

const formatTaskLine = (task: TaskDetail): string => {
    let line = `#${task.id} [${task.status}] ${task.title}`;
    if (task.description) line += ` - ${task.description}`;

    if (task.dueDate) {
        const today = moment().startOf('day');
        const due = moment(task.dueDate, 'DD/MM/YYYY').startOf('day');
        const diffDays = due.diff(today, 'days');

        if (diffDays >= 0) {
            line += ` (Due in ${diffDays} day(s))`;
        } else {
            line += ` (Overdue by ${Math.abs(diffDays)} day(s))`;
        }
    }
    return line;
};

const calculateDueDateLines = (tasks: TaskDetail[]): string[] => {
    return tasks.map(formatTaskLine);
};

export { calculateDueDateLines }