const logger = require('./logger');

/**
 * @function errorHandler
 * @description Express global error handler middleware (must have 4 arguments).
 * Logs the error and sends a generic 500 status response to the client.
 * @param {Error} err - The error object passed by Express.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Callback function (needed by Express, even if unused).
 */
const errorHandler = (err, req, res, next) => {
    // Log the full error stack/details internally
    logger.error(err);
    
    // Send a generic error message to the client to avoid leaking internal details
    res.status(500).json({ error: 'Something went wrong.' });
};

module.exports = errorHandler;