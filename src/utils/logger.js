const winston = require('winston');

/**
 * @constant logger
 * @description A Winston logger instance configured for file and console logging.
 */
const logger = winston.createLogger({
    level: 'info', // Log messages with level 'info' and above
    format: winston.format.json(), // Use JSON format for structured logging
    transports: [
        // Transport for logging only error messages to a file
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // Transport for logging all messages (info and above) to the console
        new winston.transports.Console()
    ]
});

module.exports = logger;