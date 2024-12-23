//import express from 'express';
const express = require('express');
require('dotenv').config();


const userRoute = require('./src/Api/Routes/UserRoute');
const roleRoute = require('./src/Api/Routes/RoleRoute');
const tagRoute = require('./src/Api/Routes/tagRoute');
const realestateRoute = require('./src/Api/Routes/RealestateRoute');
const contractRoute = require('./src/Api/Routes/ContractRoute');
const checkListRoute = require('./src/Api/Routes/CheckListRoute');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/", userRoute);
app.use("/", roleRoute);
app.use("/", tagRoute);
app.use("/", realestateRoute);
app.use("/", contractRoute);
app.use("/", checkListRoute);
const port = process.env.PORT || 3000;
const httpServer = app.listen(port, () =>{
    console.log(`Welcome to my website, http://localhost:${port}`)
});