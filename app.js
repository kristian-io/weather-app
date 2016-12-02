const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // console.log(JSON.stringify(results, undefined, 2));
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude , (error, temperature) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(JSON.stringify(temperature, undefined, 2));
        console.log(`Its currently ${temperature.temperature}°C. It feels like ${temperature.apparentTemperature}°C`);
      }
    });
  }
})

// var latitude = 48.11
// var longitude = 17.11
