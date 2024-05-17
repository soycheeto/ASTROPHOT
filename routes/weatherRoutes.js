const express = require('express');
const { checkWeather } = require('../controllers/weatherController');
const router = express.Router();

router.get('/check-weather', checkWeather);

module.exports = router;
