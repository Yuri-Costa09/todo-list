import { TaskRouter } from './features/task/routers/TaskRouter';
import { UserRouter } from './features/user/routers/UserRouter'
import express from 'express'
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'https://todofrontendlist.netlify.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(express.json());

app.use('/api/users', UserRouter);
app.use('/api/tasks', TaskRouter);

export default app