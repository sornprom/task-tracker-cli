export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface TaskDetail {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
}