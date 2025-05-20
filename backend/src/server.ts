import app from './app';

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3001, '0.0.0.0', () => {
    console.log('Server running on port 0.0.0.0:3001');
})