const app = require("./app");
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });
const connectDatabase = require('./config/dbConnect.js');

connectDatabase();
// const port = process.env.PORT;
// console.log("port"+process.env.PORT);


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });