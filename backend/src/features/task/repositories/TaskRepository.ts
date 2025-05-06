import { ITaskRepository } from "../interfaces/ITaskRepository";
import {  Task } from "generated/prisma";
import { PrismaClient } from '../../../../generated/prisma';

export class TaskRepository implements ITaskRepository {
    private prisma: PrismaClient
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }   

    create(data: Omit<Task, 'id'>): Promise<Task> {
        return this.prisma.task.create({
            data,
        });
    }
    updateTask(id: string, data: Partial<Omit<Task, 'id'>>): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data
        })
    }
    deleteTask(id: string): Promise<void> {
        return this.prisma.task.delete({
            where: { id }
        }).then(() => {});
    }
    getTasksByUserId(userId: string): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { authorId: userId }
        })
    }
}