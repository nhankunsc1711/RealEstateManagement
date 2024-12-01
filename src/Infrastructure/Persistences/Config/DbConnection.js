const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.CONNECTION_STRING;
const dbName = process.env.DATABASE_NAME;
async function connectDB() {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true , dbName: dbName});
        console.log("Connected successfully to database !");
    } catch (error) {
        console.log('Connect failure!');
        throw new Error(error.message)
    }
}

module.exports = {connectDB}