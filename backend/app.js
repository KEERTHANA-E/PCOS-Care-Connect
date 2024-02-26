const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const errorMiddleware = require("./middleware/error.js")



app.use(cookieParser());
app.use(express.json());



const post = require('./routes/postRoute.js');
const eduContent = require('./routes/eduContentRoute.js');
const user = require('./routes/userRoute.js');

// Configure CORS middleware with specific options
const corsOptions = {
  origin: 'http://localhost:4200', // Adjust this to match the origin of your Angular app
  credentials: true // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use('/api/v1', post);
app.use('/api/v1', eduContent);
app.use('/api/v1', user);
app.use(errorMiddleware);
module.exports = app;