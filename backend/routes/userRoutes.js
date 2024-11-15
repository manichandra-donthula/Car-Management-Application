const express = require('express');
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Register route
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

// Route for getting user profile
router.get('/me', protect, getCurrentUser);

module.exports = router; // Ensure this line exports only `router`
