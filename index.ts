//import express from 'express';
const express = require('express');
require('dotenv').config();


const userRoute = require('./src/Api/Routes/UserRoute');
const roleRoute = require('./src/Api/Routes/RoleRoute');
const realestateRoute = require('./src/Api/Routes/RealestateRoute');
const contractRoute = require('./src/Api/Routes/ContractRoute');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api", userRoute);
app.use("/api", roleRoute);
app.use("/api", realestateRoute);
app.use("/api", contractRoute);
const port = process.env.PORT || 3000;
const httpServer = app.listen(port, () =>{
    console.log(`Welcome to my website, http://localhost:${port}`)
});