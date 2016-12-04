const request = require('request');
const weather = require('../config.js')

var getWeather = (latitude, longitude, callback) => {
    request({
    url: `https://api.darksky.net/forecast/${weather.weatherKey}/${latitude},${longitude}?units=si`,
    JSON: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: JSON.parse(body).currently.temperature,
        apparentTemperature: JSON.parse(body).currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather data');
    }
  });
}

module.exports = {
  getWeather
}
