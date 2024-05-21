/*
-axios is a js library used to make HTTP requests from the browser and node.js
-used to interact with APIs and fetch and send data from and to servers
-axios works based on promises: if the request is fulfilled it will send a resolved response. if it fails it will throw the error stating why the failure orccured
-axios automatically parses JSON data into JS objs. our API response is in JSON
-axios allows us to handle server errors gracefully
*/


const axios = require('axios'); //import axios

const getWeatherData = async(lat, lon, apiKey) => { //asynchronous function that takes latitude, longitude and API key

  //constructing the base url to get information from the api using the lat and long values 
  //the values are inserted using template literals
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; 

  // response is a variable that stores the response from an axios HTTP GET request
  // await keyword waits for the promise returned by axios.get to resolve
  const response = await axios.get(baseUrl);  

  //data property of response contains actual weather data fetched from the api
  return response.data;
};


//function to analyze weather data, takes pased json response as input
const analyzeWeatherData = (data) => {
  //extracts temperatures, feels like temperature and humidity level from main group
  const { temp, feels_like, humidity } = data.main;
  //extracts visibility distance value from visibility key
  const visibility = data.visibility;
  //saves name of location in 'place' variable
  const place = data.name;
  //saves weather description and weather icon from weather array
  const { description, icon } = data.weather[0];
  //extracts sunrise and sunset values from the .sys group
  const { sunrise, sunset } = data.sys;

  //retrieves formatted icon from the website
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const fahrenheit = (temp * 9) / 5 + 32;

  //creates new Date objects for sunrise and sunset by converting Unix timestamps into GMT
  const sunriseGMT = new Date(sunrise * 1000);
  const sunsetGMT = new Date(sunset * 1000);

  // Analyze weather conditions for optimal sky-viewing
  const isOptimal = visibility > 9500 && humidity < 80; // Example criteria

  //returns and object of restructured relevant data
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


//exports getWeatherData() and analyzeWeatherData so it's usable by other functions in the dir
module.exports = { getWeatherData, analyzeWeatherData };