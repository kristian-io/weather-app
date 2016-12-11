const yargs = require('yargs');
const axios = require('axios');

const config = require('config-example.js')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch wheater for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl =  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`


axios.get(geocodeUrl).then( (response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  var lat	= response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/${config.weatherKey}/${latitude},${longitude}?units=si`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  // console.log(typeof(response.data.currently));
  var temperature = response.body.currently.temperature;
  var apparentTemperature = response.body.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((error) => {
  if (error.code ==="ENOTFOUND") {
    console.log('Unable to connect to google servers');
  } else {
     console.log(error.message);
  }
});
