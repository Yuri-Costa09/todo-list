import { TaskRouter } from './features/task/routers/TaskRouter';
import { UserRouter } from './features/user/routers/UserRouter'
import express from 'express'

const app = express();
app.use(express.json());

app.use('/api/users', UserRouter);
app.use('/api/tasks', TaskRouter);

export default app