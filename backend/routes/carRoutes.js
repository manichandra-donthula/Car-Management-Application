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
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: The cars managing API
 */

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a car
 *     description: This endpoint allows the user to create a new car with images (up to 10).
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               brand:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: The car was created successfully.
 *       401:
 *         description: Unauthorized, invalid or expired token.
 *       400:
 *         description: Bad request, invalid data.
 */
router.post('/', protect, upload.array('images', 10), createCar);

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars for the logged-in user
 *     description: This endpoint fetches all cars associated with the logged-in user.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of cars associated with the logged-in user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   model:
 *                     type: string
 *                   brand:
 *                     type: string
 *                   price:
 *                     type: number
 */
router.get('/', protect, getCars);

/**
 * @swagger
 * /cars/search:
 *   get:
 *     summary: Search cars by term
 *     description: This endpoint allows users to search for cars based on a search term.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         description: Search term for filtering cars
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of cars that match the search term.
 *       404:
 *         description: No cars found matching the search term.
 */
router.get('/search', protect, searchCars);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get car by ID
 *     description: This endpoint retrieves details of a specific car by its ID.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The car details.
 *       404:
 *         description: Car not found.
 */
router.get('/:id', protect, getCarById);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     description: This endpoint allows users to update a car's details by its ID.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               brand:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: The car was updated successfully.
 *       400:
 *         description: Invalid data provided.
 *       404:
 *         description: Car not found.
 */
router.put('/:id', protect, upload.array('images', 10), updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     description: This endpoint allows users to delete a car by its ID.
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The car was deleted successfully.
 *       404:
 *         description: Car not found.
 */
router.delete('/:id', protect, deleteCar);

module.exports = router;
