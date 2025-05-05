import { PrismaClient } from "@prisma/client";
import { ITaskRepository } from "../interfaces/ITaskRepository";
import { Task } from "generated/prisma";
import { prisma } from '../../../prismaClient';

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
    deleteTask(id: string, prisma: PrismaClient): Promise<void> {
        return this.prisma.task.delete({
            where: { id }
        })
    }
    getTasksByUserId(userId: string): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { authorId: userId }
        })
    }
}