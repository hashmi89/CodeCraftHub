const mongoose = require('mongoose');

/**
 * @function connectDB
 * @description Establishes a connection to the MongoDB database using Mongoose.
 * It uses the connection string stored in the MONGO_URI environment variable.
 * The process is terminated if the connection fails.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // Deprecated options kept for compatibility, but Mongoose v8.x often manages these internally.
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        // Exit process with failure code
        process.exit(1);
    }
};

module.exports = connectDB;