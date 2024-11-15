const express = require('express');
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  searchCars,
} = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Import the upload middleware

const router = express.Router();

// Create a car with image upload handling (up to 10 images)
router.post('/', protect, upload.array('images', 10), createCar);

// Get all cars associated with the logged-in user
router.get('/', protect, getCars);

// Route for searching cars (search term passed as a query parameter)
router.get('/search', protect, searchCars);

// Get a single car by ID
router.get('/:id', protect, getCarById);

// Update a car by ID (with optional image upload handling)
router.put('/:id', protect, upload.array('images', 10), updateCar);

// Delete a car by ID
router.delete('/:id', protect, deleteCar);

module.exports = router;
