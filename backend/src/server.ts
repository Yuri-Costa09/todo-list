import app from './app';
import https from 'https';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Servidor HTTP na porta 3000
app.listen(3000, '0.0.0.0', () => {
    console.log('HTTP Server running on port 0.0.0.0:3000');
})

const SSL_KEY_PATH = process.env.SSL_KEY_PATH || 'certs/private-key.pem';
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || 'certs/certificate.pem';

// Servidor HTTPS na porta 3001
https.createServer({
    key: fs.readFileSync(SSL_KEY_PATH),
    cert: fs.readFileSync(SSL_CERT_PATH),
}, app).listen(3001, '0.0.0.0', () => {
    console.log('HTTPS Server running on port 0.0.0.0:3001');
});
