const request = require('request');
const geocode = require('./../geocode/geocode');

//Getting weather data from darksky provided latitude and longitude
var getWeather = (latitude, longitude, callback) => {
    request({
    url: `https://api.darksky.net/forecast/83de1ca259e9f5021a7750000c013aba/${latitude},${longitude}?units=si`, //need to put the key to config file later...
    JSON: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var body = JSON.parse(body);
      // console.log(body.daily.data.length);
      var allData = [];                               //parse body
      var weeklyData = [];
      allData.push({"summary": body.daily.summary});           //1st item contains summary for the whole week
      for (var i=0; i < body.daily.data.length; i++) {      //create array with data we want; summary, min and max temperatues 0 -today; then  1 - 7 days
        // var date = new Date(body.daily.data[i].time);
        // console.log(body.daily.data[i].time);
        // console.log(date.getDay());
        var obj = {
          "time" : body.daily.data[i].time,                                  //???????
          "summary":  body.daily.data[i].summary,
          "temperatureMin": body.daily.data[i].temperatureMin,
          "temperatureMinTime": body.daily.data[i].temperatureMinTime,
          "temperatureMax": body.daily.data[i].temperatureMax,
          "temperatureMaxTime": body.daily.data[i].temperatureMaxTime
        }
        weeklyData.push(obj);                                   // second intem in the array has the data for week
        // var date = '';
      }
      allData.push(weeklyData);
      // console.log(data);
      callback(undefined,  allData);
    } else {
      callback('Unable to fetch weather data');
    }
  });
}

//Google Maps API to darksky API.
var getWeatherFromAddress = (address, callback) => {
  // console.log('Address received is: ', address);
  geocode.geocodeAddress(address, (error, results) => {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      // lets get the weather from darksky
      console.log(results);
      getWeather(results.latitude, results.longitude , (error, data) => {
        if (error) {
          console.log(error);
          callback(error);
        } else {
          // console.log(JSON.stringify(temperature, undefined, 2));
          // console.log(`Its currently ${temperature.temperature}°C. It feels like ${temperature.apparentTemperature}°C`);
          //adding resolved adddress do data
          data[0].address = results.address
          callback(undefined, data);
          // callback(temperature.temperature);
        }
      });
    }
  });
}


// getWeatherFromAddress('Paris', (temperature) => {
//   console.log(temperature);
// });

module.exports = {
  getWeatherFromAddress
}
