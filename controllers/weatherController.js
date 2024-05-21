//import functions from weatherModel.js
const { getWeatherData, analyzeWeatherData } = require('../models/weatherModel');

// Function to render the home page

/*
The res.render method is used to render a view and send the rendered HTML string to the client. The first argument to res.render is the name of the view file (without the .ejs extension), and the second argument is an object that contains the data to be passed to the view.
*/
const renderHomePage = (req, res) => {
  //homepage view will be rendered according to the index.ejs file, except it does not contain any weatherInfo
  //this will display when the user first visits the website
  res.render('index', { weatherInfo: null });
};

// Function to check the weather
const checkWeather = async (req, res) => {
  //extracts lat and lon values from the request url
  const { lat, lon } = req.query;
  const apiKey = 'key'; // Replace with your actual API key

  try {
    // if successful, stores weatherData obtained after calling getWeatherData
    const weatherData = await getWeatherData(lat, lon, apiKey);
    // restructures and analyzes weatherData by calling analyzeWeatherData and stores it in weatherInfo
    const weatherInfo = analyzeWeatherData(weatherData);

    //displays rendered html according to views/index.ejs
    res.render('index', { weatherInfo });
  } catch (error) {

    //throws internal server error if error checking weather
    res.status(500).send('Error checking weather');
  }
};

module.exports = { checkWeather, renderHomePage };
