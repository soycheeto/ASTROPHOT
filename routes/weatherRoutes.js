//import express framework
const express = require('express');

//import checkWeather() and renderHomePage() from controllers/weatherController.js
const { checkWeather, renderHomePage } = require('../controllers/weatherController');

//creates router object to define routes that the app will respond too
const router = express.Router();

// route for the homepage
// when a GET request is made to the root URL '/',  renderHomePage() from weatherController will be called
//renders home page content
router.get('/', renderHomePage);

// when GET request is made to /check-weather, the checkWeather() from weatherController.js is called
// retrieves weatherdata and info by calling getWeatherData() and analyzeWeatherData() from weatherModel.js
router.get('/check-weather', checkWeather);

//exports router object so it can be used by other programs in the dir
module.exports = router;
