require('dotenv').config();
const express = require('express');
const app = express();


const userRoutes = require('./routes/user_routes');


const {jwtAuth} = require('./auth/auth')


app.use(express.json())





app.use('/api/v1/users', userRoutes)






app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/auth',jwtAuth,  (req, res) => {
    res.send('Hello World!');
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})