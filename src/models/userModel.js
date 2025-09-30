const mongoose = require('mongoose');

/**
 * @typedef User
 * @property {string} username - Unique username.
 * @property {string} email - Unique email address.
 * @property {string} password - Hashed password.
 * @property {('student'|'instructor'|'admin')} role - User role for authorization.
 * @property {Date} createdAt - Timestamp of user creation.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        // Restricts the role field to one of these three values
        enum: ['student', 'instructor', 'admin'],
        default: 'student' // Default role for new users
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Mongoose Model for the User collection
const User = mongoose.model('User', userSchema);

module.exports = User;