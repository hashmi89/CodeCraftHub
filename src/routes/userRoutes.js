const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Public route for creating a new user account
router.post('/register', registerUser);

// Public route for authenticating and receiving a JWT
router.post('/login', loginUser);

module.exports = router;