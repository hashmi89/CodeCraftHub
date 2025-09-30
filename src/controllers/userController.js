const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @function registerUser
 * @description Handles user registration. Hashes the password before saving the user.
 * @param {object} req - Express request object (expects username, email, password in body).
 * @param {object} res - Express response object.
 */
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash the password for security (10 is the salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        // Handle database errors (e.g., unique constraint violation for username/email)
        res.status(500).json({ error: 'Registration failed.' });
    }
};

/**
 * @function loginUser
 * @description Handles user login, verifies password, and generates a JWT.
 * @param {object} req - Express request object (expects email, password in body).
 * @param {object} res - Express response object.
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        
        // 2. Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        
        // 3. Generate a JWT token containing the user ID
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || 'secret', // Use environment variable for secret
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
};