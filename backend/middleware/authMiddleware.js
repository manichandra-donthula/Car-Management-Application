const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Protect Middleware - Token received:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Protect Middleware - Decoded token:', decoded);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        console.log('Protect Middleware - User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('Protect Middleware - User authenticated:', req.user);
      next();
    } catch (error) {
      console.error('Protect Middleware - Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('Protect Middleware - No token provided');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
