const { getWeatherData, analyzeWeatherData } = require('../models/weatherModel');

// Function to render the home page
const renderHomePage = (req, res) => {
  res.render('index', { weatherInfo: null });
};

// Function to check the weather
const checkWeather = async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = 'key'; // Replace with your actual API key

  try {
    const weatherData = await getWeatherData(lat, lon, apiKey);
    const weatherInfo = analyzeWeatherData(weatherData);
    res.render('index', { weatherInfo });
  } catch (error) {
    res.status(500).send('Error checking weather');
  }
};

module.exports = { checkWeather, renderHomePage };
