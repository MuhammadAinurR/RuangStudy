const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/user')

app.use('/users', userRoutes)

app.listen(port, () => console.log('service is running on http://localhost:3000/'))