const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
    url: `https://api.darksky.net/forecast/ed7140adb2601c73d4d521fe7b611206/${latitude},${longitude}?units=si`,
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
