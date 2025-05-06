import { TaskRouter } from './features/task/routers/TaskRouter';
import { UserRouter } from './features/user/routers/UserRouter'
import express from 'express'
import { verifyToken } from './features/middlewares/AuthMiddleware';

const app = express();
app.use(express.json());

app.use('/api/users', UserRouter);
app.use('/api/tasks', verifyToken, TaskRouter);

export default app