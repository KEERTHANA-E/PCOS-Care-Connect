const express = require('express');

const app = express();

app.use(express.json());

const post = require('./routes/postRoute.js');
const eduContent = require('./routes/eduContentRoute.js');

app.use('/api/v1',post);
app.use('/api/v1',eduContent);

module.exports = app;