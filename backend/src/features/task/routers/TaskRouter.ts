import { Router } from "express";
import { PrismaClient } from '../../../../generated/prisma';
import { TaskRepository } from "../repositories/TaskRepository";
import { TaskService } from "../services/TaskService";
import { TaskController } from "../controllers/TaskController";

const prisma = new PrismaClient();
const taskRepository = new TaskRepository(prisma);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

export const TaskRouter = Router();

TaskRouter.post("/create", (req, res) => taskController.createTask(req, res));
TaskRouter.put("/update/:id", (req, res) => taskController.updateTask(req, res));
TaskRouter.delete("/delete/:id", (req, res) => taskController.deleteTask(req, res));
TaskRouter.get("/user/:userId", (req, res) => taskController.getTasksByUserId(req, res));
