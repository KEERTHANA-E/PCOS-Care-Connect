const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const errorMiddleware = require("./middleware/error.js")
const post = require('./routes/postRoute.js');
const eduContent = require('./routes/eduContentRoute.js');
const user = require('./routes/userRoute.js');
app.use(cors());
app.use('/api/v1',post);
app.use('/api/v1',eduContent);
app.use('/api/v1', user);
app.use(errorMiddleware);
module.exports = app;