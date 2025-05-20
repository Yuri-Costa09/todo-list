import { TaskRouter } from './features/task/routers/TaskRouter';
import { UserRouter } from './features/user/routers/UserRouter'
import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors({
    origin: [
        'https://todofrontendlist.netlify.app',
        'https://todofrontendlist.netlify.app/',
        'https://aitrip.one',
        'https://aitrip.one/',
        'http://localhost:3000',
        'http://localhost:3001'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(express.json());

app.use('/api/users', UserRouter);
app.use('/api/tasks', TaskRouter);

export default app