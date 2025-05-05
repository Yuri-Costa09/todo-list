import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    async createTask(req: Request, res: Response) {
        try {
            const data = req.body;
            const task = await this.taskService.createTask(data);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const task = await this.taskService.updateTask(id, data);
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const userId = req.body.userId; // userId pode vir do body ou do middleware de auth
            await this.taskService.deleteTask(id, userId);
            res.status(204).send();
        } catch (error) {
            res.status(403).json(error);
        }
    }

    async getTasksByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const tasks = await this.taskService.getTasksByUserId(userId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
