const express = require('express');
const { checkWeather, renderHomePage } = require('../controllers/weatherController');
const router = express.Router();

// Route for the home page
router.get('/', renderHomePage);

// Route for checking the weather
router.get('/check-weather', checkWeather);

module.exports = router;
