const express = require('express')
const dotenv = require('dotenv');
const {connectDataBase} = require("./config/db");
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const API_USER = '/api/user';
const API_CHAT = '/api/chat';

dotenv.config();
connectDataBase();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API IS RUNNING!')
})

app.use(API_USER, userRoutes);
app.use(API_CHAT, chatRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`.yellow.bold)
})