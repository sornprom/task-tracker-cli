import moment from "moment";
import { TaskDetail } from "../models/tasks";

const formatTaskLine = (task: TaskDetail): string => {
    let line = `#${task.id} [${task.status}] ${task.title}`;
    if (task.description) line += ` - ${task.description}`;

    if (task.dueDate) {
        const today = new Date();
        const due = moment(task.dueDate, 'DD/MM/YYYY').toDate();
        const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

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