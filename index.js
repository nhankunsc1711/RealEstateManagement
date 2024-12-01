const express = require('express');
require('dotenv').config();
//const {connectDB} = require("./src/Infrastructure/Persistences/Config/DbConnection");


const userRoute = require('./src/Api/Routes/UserRoute');
const app = express();

app.use(express.json()); // Xử lý JSON từ body
app.use(express.urlencoded({ extended: true })); // Xử lý form-urlencoded

app.use("/api", userRoute);
app.use('/', (req, res) =>{
    res.send("This is my new project");
});
//connectDB();
const port = process.env.PORT || 3000;
const httpServer = app.listen(port, () =>{
    console.log(`Welcome to my website, http://localhost:${port}`)
})

