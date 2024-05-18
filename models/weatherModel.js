const axios = require('axios');

const getWeatherData = async (lat, lon, apiKey) => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await axios.get(baseUrl);
  return response.data;
};

const analyzeWeatherData = (data) => {
  const { temp, feels_like, humidity } = data.main;
  const visibility = data.visibility; // Extract visibility correctly
  const place = data.name;
  const { description, icon } = data.weather[0];
  const { sunrise, sunset } = data.sys;

  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const fahrenheit = (temp * 9) / 5 + 32;

  const sunriseGMT = new Date(sunrise * 1000);
  const sunsetGMT = new Date(sunset * 1000);

  // Analyze weather conditions for optimal sky-viewing
  const isOptimal = visibility > 9500 && humidity < 80; // Example criteria

  return {
    weatherData: {
      temp,
      feels_like,
      place,
      description,
      iconUrl,
      fahrenheit: fahrenheit.toFixed(2),
      sunrise: `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`,
      sunset: `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`,
      visibility: visibility !== undefined ? visibility : 'No data available',
    },
    isOptimal,
  };
};

module.exports = { getWeatherData, analyzeWeatherData };
