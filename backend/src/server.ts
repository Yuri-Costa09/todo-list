import cors from 'cors';
import app from './app';

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.listen(3001, '0.0.0.0', () => {
    console.log('Server running on port 0.0.0.0:3001');
})