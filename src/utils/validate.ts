import moment from "moment";

function isValidDateFormat(date: string) {
    return moment(date, 'DD/MM/YYYY', true).isValid()
}

function isAllowStatus(status: string) {
    const allowedStatuses = ["todo", "in-progress", "done"] as const;
    type TaskStatus = typeof allowedStatuses[number];
    return allowedStatuses.includes(status as TaskStatus);
}

export const validate = {
    isValidDateFormat,
    isAllowStatus
}