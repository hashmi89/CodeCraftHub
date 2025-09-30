const User = require('../models/userModel');

/**
 * @function findUserById
 * @description Data access layer function to retrieve a user by their unique ID.
 * @param {string} userId - The MongoDB ObjectId of the user.
 * @returns {Promise<User|null>} The user document or null if not found.
 */
exports.findUserById = async (userId) => {
    return await User.findById(userId);
};