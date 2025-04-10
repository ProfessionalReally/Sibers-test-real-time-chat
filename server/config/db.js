const mongoose = require('mongoose/lib');

const connectDataBase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline);
    } catch (e) {
        console.error(`Error: ${e.message}`.red.bold);
        process.exit(1);
    }
};

module.exports = { connectDataBase };