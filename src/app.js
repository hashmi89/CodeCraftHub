// Load environment variables (calls src/config/env.js implicitly)
require('dotenv').config(); 

const express = require('express');
const connectDB = require('./config/db'); // Database connection function
const initServer = require('./config/server'); // Server initialization function
const userRoutes = require('./routes/userRoutes'); // User authentication routes
const errorHandler = require('./utils/errorHandler'); // Global error handler

// Initialize the Express app with core middleware
const app = initServer(); 

// Connect to the MongoDB database asynchronously
connectDB(); 

// --- ROUTE SETUP ---
// Mount user authentication routes at the /api/users base path
app.use('/api/users', userRoutes); 

// --- ERROR HANDLING ---
// Place the global error handler as the last piece of middleware
app.use(errorHandler);

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));