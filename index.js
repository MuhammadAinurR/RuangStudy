const { sessionConfig } = require('./middlewares/auth');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(sessionConfig)
app.use(express.static('public'))

app.use('/', require('./routes'))

app.listen(port, () => console.log('service is running on http://localhost:3000/'))