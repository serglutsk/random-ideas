const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MomgoDB connected ${conn.host}`);
}

module.exports = connectDB;
