const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check for token in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Verify token and decode the payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request object, excluding the password field
      req.user = await User.findById(decoded.id).select('-password');
      
      // If user is not found, return 404
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next(); // Continue to the next middleware/handler
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
