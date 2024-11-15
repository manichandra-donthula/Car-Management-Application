const multer = require('multer');
const path = require('path');
const Car = require('../models/car');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // add timestamp to file name
  },
});

const upload = multer({ storage });

// @desc    Create a new car
// @route   POST /api/cars
// @access  Private
const createCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map(file => file.path) : []; // Extract image paths

    if (images.length > 10) {
      return res.status(400).json({ message: 'You can upload up to 10 images only.' });
    }

    const newCar = new Car({
      userId: req.user._id,
      title,
      description,
      tags,
      images,
    });

    await newCar.save();
    res.status(201).json({ message: 'Car created successfully', car: newCar });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all cars of the logged-in user
// @route   GET /api/cars
// @access  Private
const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user._id });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single car by ID
// @route   GET /api/cars/:id
// @access  Private
const getCarById = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, userId: req.user._id });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a car by ID
// @route   PUT /api/cars/:id
// @access  Private
const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found or not authorized' });
    }
    res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a car by ID
// @route   DELETE /api/cars/:id
// @access  Private
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!car) {
      return res.status(404).json({ message: 'Car not found or not authorized' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Search cars by Keyword
// @route   GET /api/cars/search?keyword=<search-term>
// @access  Private
const searchCars = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    
    // Build search query
    const query = {
      userId: req.user._id,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } }
      ]
    };

    const cars = await Car.find(query);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  searchCars,
};
