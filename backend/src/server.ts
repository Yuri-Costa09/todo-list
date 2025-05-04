const app = require('./app') 
const cors = require('cors')

app.use(cors())
app.listen(3001, () => {
    console.log('Server running on port 3001');
})