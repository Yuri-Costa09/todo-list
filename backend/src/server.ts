import cors from 'cors';
import app from './app';

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(cors())
app.listen(3001, () => {
    console.log('Server running on port 3001');
})