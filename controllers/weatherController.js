const { getWeatherData, analyzeWeatherData } = require('../models/weatherModel');

const checkWeather = async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  try {
    const weatherData = await getWeatherData(lat, lon, apiKey);
    const weatherInfo = analyzeWeatherData(weatherData);
    res.render('index', { weatherInfo });
  } catch (error) {
    res.status(500).send('Error checking weather');
  }
};

module.exports = { checkWeather };
