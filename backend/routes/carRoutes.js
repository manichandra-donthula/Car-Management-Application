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

const router = express.Router();

// Create a car
router.post('/', protect, createCar);

// Get all cars of the logged-in user
router.get('/', protect, getCars);

// Route for searching cars
router.get('/search', protect, searchCars);

// Get a single car by ID
router.get('/:id', protect, getCarById);

// Update a car by ID
router.put('/:id', protect, updateCar);

// Delete a car by ID
router.delete('/:id', protect, deleteCar);

module.exports = router;
