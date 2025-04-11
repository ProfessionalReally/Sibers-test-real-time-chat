const express = require('express')
const dotenv = require('dotenv');
const {connectDataBase} = require("./config/db");
const colors = require('colors');
const userRoutes = require('./routes/userRoutes')
const API_USER = '/api/user';

dotenv.config();
connectDataBase();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API IS RUNNING!')
})

app.use(API_USER, userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`.yellow.bold)
})