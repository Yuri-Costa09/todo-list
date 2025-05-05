import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import UserRepository from '../repositories/UserRepository';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const UserRouter = Router();

UserRouter.post('/register', (req, res) => userController.register(req, res));
UserRouter.post('/login', (req, res) => userController.login(req, res));

/** Only for Authenticated users {admin} **/
UserRouter.get('/:id', (req, res) => userController.getUserById(req, res));

