import { Task } from "generated/prisma";
import { PrismaClient } from "@prisma/client";

export interface ITaskRepository {
    create(data: Omit<Task, 'id'>): Promise<Task>;
    updateTask(id: string, data: Partial<Omit<Task, 'id'>>): Promise<Task>;
    deleteTask(id: string, prisma: PrismaClient): Promise<void>;
    getTasksByUserId(userId: string): Promise<Task[]>;
}