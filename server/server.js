const express = require('express')
const dotenv = require('dotenv');
const {connectDataBase} = require("./config/db");
const colors = require('colors');

dotenv.config();
connectDataBase();
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API IS RUNNING!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`.yellow.bold)
})