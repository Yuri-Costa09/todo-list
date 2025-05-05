import { ITaskRepository } from "../interfaces/ITaskRepository";
import { Task } from "generated/prisma";

export class TaskService {
    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    async createTask(data: Omit<Task, 'id'>): Promise<Task> {
        return this.taskRepository.create(data);
    }

    async updateTask(id: string, data: Partial<Omit<Task, 'id'>>): Promise<Task> {
        return this.taskRepository.updateTask(id, data);
    }

    async deleteTask(id: string, userId: string): Promise<void> {
        const tasks = await this.taskRepository.getTasksByUserId(userId);
        const task = tasks.find(t => t.id === id);
        if (!task) {
            throw new Error('Task not found or you do not have permission to delete this task');
        }
        await this.taskRepository.deleteTask(id, (this.taskRepository as any).prisma);
    }

    async getTasksByUserId(userId: string): Promise<Task[]> {
        return this.taskRepository.getTasksByUserId(userId);
    }
}
