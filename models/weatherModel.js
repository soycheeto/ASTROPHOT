const axios = require('axios');

const getWeatherData = async (lat, lon, apiKey) => {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: lon,
        appid: apiKey,
        units: 'metric'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};

const analyzeWeatherData = (weatherData) => {
  const { temp, feels_like, humidity, visibility } = weatherData.main;
  const { description, icon } = weatherData.weather[0];
  const { sunrise, sunset } = weatherData.sys;
  const place = weatherData.name;
  const cloudCover = weatherData.clouds.all;

  const fahrenheit = (temp * 9) / 5 + 32;
  const sunriseGMT = new Date(sunrise * 1000);
  const sunsetGMT = new Date(sunset * 1000);

  const isOptimal = cloudCover < 30 && visibility > 8000 && humidity < 70;

  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return {
    isOptimal,
    weatherData: {
      temp: temp.toFixed(2),
      feels_like: feels_like.toFixed(2),
      humidity,
      visibility,
      description,
      iconUrl,
      place,
      sunrise: `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`,
      sunset: `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`,
      fahrenheit: fahrenheit.toFixed(2),
      cloudCover
    }
  };
};

module.exports = { getWeatherData, analyzeWeatherData };
