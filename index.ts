//import express from 'express';
const express = require('express');
require('dotenv').config();


const userRoute = require('./src/Api/Routes/UserRoute');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api", userRoute);
const port = process.env.PORT || 3000;
const httpServer = app.listen(port, () =>{
    console.log(`Welcome to my website, http://localhost:${port}`)
});