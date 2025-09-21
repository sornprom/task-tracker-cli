export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface TaskDetail {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
    dueDate?: string
}

export type Command = 'add' | 'list' | 'update' | 'delete' | 'mark-in-progress' | 'mark-done'
