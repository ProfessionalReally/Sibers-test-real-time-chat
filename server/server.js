const express = require('express')
const app = express()
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API IS RUNNING!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})