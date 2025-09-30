const jwt = require('jsonwebtoken');

/**
 * @function authMiddleware
 * @description Middleware to protect routes by verifying a JWT in the Authorization header.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Callback function to proceed to the next middleware/route handler.
 */
const authMiddleware = (req, res, next) => {
    // Expects header format: Authorization: Bearer <token>
    const token = req.header('Authorization')?.split(' ')[1];
    
    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user payload (containing id) to the request object
        req.user = verified; 
        
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid token (e.g., expired, wrong signature)
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;