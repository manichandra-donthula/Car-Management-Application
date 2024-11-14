const Car = require('../models/Car');

// @desc    Create a new car
// @route   POST /api/cars
// @access  Private
const createCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;

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

// @desc    Search a car by Keyword
// @route   GET /api/cars//search?keyword=<search-term>
// @access  Private
const searchCars = async (req, res) => {
    try {
      console.log('Search keyword:', req.query.keyword);
      const keyword = req.query.keyword
        ? {
            $or: [
              { title: { $regex: req.query.keyword, $options: 'i' } },
              { description: { $regex: req.query.keyword, $options: 'i' } },
              { tags: { $regex: req.query.keyword, $options: 'i' } }
            ]
          }
        : {};
  
      const cars = await Car.find({ userId: req.user.id, ...keyword });
  
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
