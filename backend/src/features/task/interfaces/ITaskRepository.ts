import { Task } from "generated/prisma";

export interface ITaskRepository {
    create(data: Omit<Task, 'id'>): Promise<Task>;
    updateTask(id: string, data: Partial<Omit<Task, 'id'>>): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    getTasksByUserId(userId: string): Promise<Task[]>;
}