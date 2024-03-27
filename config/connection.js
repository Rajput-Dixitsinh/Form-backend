const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`,{});
        console.log('DB Connected');
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
};

module.exports = { connectToDatabase };
