'use strict';

const express = require('express');
// const hbs = require('hbs');
const bodyParser = require('body-parser');

const {getWeatherFromAddress} = require('./weather/weather.js');

const port = process.env.PORT || 3000;

//Initialize express
var app = express();

//Setting up partials and view engine
// hbs.registerPartials(__dirname + '/views/partials')
// app.set('view engine', 'hbs');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// POST /data route
app.post('/data', (req, res) => {
  // console.log('req.body ', req.body );
  getWeatherFromAddress(req.body.address, (err, data, address) => {
    if (err) {
      console.log(err);
      res.header(404).send();
    }
    console.log('data: ', data);
    // console.log(address);
    res.send(data);
  });
});

//Custom route/middlewere to show data after GETing /[Address] -would be nice to do.
// app.use((req, res, next) => {
//   let address = req.url.replace('/', '');
//   console.log(`address would be ${address}`);
//   //request weather data for 'address' ...
//   getWeatherFromAddress(address, (err, data) => {
//     if (err) {
//       console.log(`Ups: ${err}`);
//       res.render('home.hbs', {
//         error: err,
//         data: undefined
//       });
//       return;
//     }
//     // console.log(data.temperature);
//     // temp = {
//     //  temperature: temperature,
//     //  apparentTemperature: apparentTemperature
//     // }
//     res.render('home.hbs', {
//       error: undefined,
//       data: data
//     });
//
//     // next();
//   });
//   // next();
// });



app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
