const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

/**
 * @function initServer
 * @description Initializes the Express application and sets up essential middleware.
 * @returns {express.Application} The configured Express application instance.
 */
const initServer = () => {
    const app = express();

    // 1. Enable Cross-Origin Resource Sharing (CORS) for external requests
    app.use(cors());

    // 2. Parse incoming request bodies in JSON format
    app.use(bodyParser.json());
    
    return app;
};

module.exports = initServer;