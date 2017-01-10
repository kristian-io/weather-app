function drawOurChart(data) {

      var myData = data;
    // var myData = [
    //         {
    //       "time": 1483916400,
    //       "temperatureMin": 0.73,
    //       "temperatureMax": 5.88
    //     },
    //     {
    //       "time": 1484002800,
    //       "temperatureMin": 1.43,
    //       "temperatureMax": 6.92
    //     },
    //     {
    //       "time": 1484089200,
    //       "temperatureMin": 1.13,
    //       "temperatureMax": 9.65
    //     },
    //     {
    //       "time": 1484175600,
    //       "temperatureMin": 2.37,
    //       "temperatureMax": 6.47
    //     },
    //     {
    //       "time": 1484262000,
    //       "temperatureMin": -0.93,
    //       "temperatureMax": 4.34
    //     },
    //     {
    //       "time": 1484348400,
    //       "temperatureMin": -0.36,
    //       "temperatureMax": 3.92
    //     },
    //     {
    //       "time": 1484434800,
    //       "temperatureMin": 0.98,
    //       "temperatureMax": 7.99
    //     },
    //     {
    //       "time": 1484521200,
    //       "temperatureMin": 1.45,
    //       "temperatureMax": 7.44
    //     }
    //   ];



      var  myDataPrepared = []
      var minTemp = 0, maxTemp = 0;

      myData.forEach((day) => {
        date = new Date(day.time*1000);
        dayIs = '';
        switch (date.getDay()) {
          case 0:
            dayIs = 'Sunday';
            break;
          case 1:
            dayIs = 'Monday'
            break;
          case 2:
            dayIs = 'Thuesday'
            break;
          case 3:
            dayIs = 'Wednesday'
            break;
          case 4:
            dayIs = 'Thursday'
            break;
          case 5:
            dayIs = 'Friday'
            break;
          case 6:
            dayIs = 'Saturday'
            break;
        }

        myDataPrepared.push([dayIs, day.temperatureMin, day.temperatureMin, day.temperatureMax, day.temperatureMax])
        //lets also find min and max values for all days which we will use to define ticks for vAxis:
        if (minTemp > day.temperatureMin) {
          minTemp = day.temperatureMin;
        }
        if (maxTemp < day.temperatureMax) {
          maxTemp = day.temperatureMax
        }
      });

      //creating array for ticks as [minTemp, minTemp +1, ..., maxTemp]
      minTemp = Math.round(minTemp);
      maxTemp = Math.round(maxTemp);
      var ourTicks = [];
      for (var i  = minTemp; i <= maxTemp; i++) {
        ourTicks.push(i)
      }

      // console.log(ourTicks);


      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(myDataPrepared, true);

        var options = {
          title: "Weather for this week",
          legend: 'none',
          // width: 1500,
          // height: 1400,
          backgroundColor: {fill: 'transparent'},
          vAxis: {
            format: '#,###°C',
            ticks: ourTicks
          },
          // isStacked: true,
          bar: { groupWidth: '50%' }, // Remove space between bars.
          // candlestick: {
          //   fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
          //   risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
          // }
        };

        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
}
