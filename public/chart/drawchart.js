function drawOurChart(data) {

      var myData = data; // second intem in the array has the data for week, 1st contains summary for the whole week
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



      var  myDataPrepared = [];

      var minTemp = 0, maxTemp = 0;
      var run = 0
      myData.forEach((day) => {
        date = new Date(day.time*1000);
        dayIs = '';
        switch (date.getDay()) {
          case 0:
            dayIs = ` Sun
            ${Math.round(day.temperatureMin)}°C${Math.round(day.temperatureMax)}°C`;
            break;
          case 1:
            dayIs = ` Mon
            ${Math.round(day.temperatureMin)}°C/${Math.round(day.temperatureMax)}°C`;
            break;
          case 2:
            dayIs = ` Tue
            ${Math.round(day.temperatureMin)}°C/${Math.round(day.temperatureMax)}°C`;
            break;
          case 3:
            dayIs = ` Wed
            ${Math.round(day.temperatureMin)}°C/${Math.round(day.temperatureMax)}°C`;
            break;
          case 4:
            dayIs = ` Thu
            ${Math.round(day.temperatureMin)}°C/${Math.round(day.temperatureMax)}°C`;
            break;
          case 5:
            dayIs = ` Fri
            ${Math.round(day.temperatureMin)}°C/${Math.round(day.temperatureMax)}°C`;
            break;
          case 6:
            dayIs = ` Sat
            ${Math.round(day.temperatureMin)}°C/${Math.round(day.temperatureMax)}°C`
            break;
        }
        //adding the data to data table and rounding it.
        //if its 1st run we dont need to tell day; rather tell Today
        if (run === 0) {
          dayIs = ` Today
          ${Math.round(day.temperatureMin)}°C/${Math.round(day.temperatureMax)}°C`;
        };
        myDataPrepared.push([dayIs, Math.round(day.temperatureMax), Math.round(day.temperatureMin)]);
        //lets also find min and max values for all days which we will use to define ticks for vAxis:
        if (minTemp > day.temperatureMin) {
          minTemp = day.temperatureMin;
        }
        if (maxTemp < day.temperatureMax) {
          maxTemp = day.temperatureMax
        }
        run++;
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

        if ($(window).width() < 400) {
          // for small screens; this is not perfect
          graphWidth = $(window).width() *0.95;
          graphHeight = $(window).height() * 0.80;
          console.log(graphWidth, graphHeight);
          var chArea =  {'width': '80%', 'height': '70%'};
        } else {
          //bigger screens; not bad.
          graphWidth = $(window).width() *0.65;
          graphHeight = $(window).height() * 0.5;
          console.log(graphWidth, graphHeight);
          var chArea =  {'width': '80%', 'height': '70%'};
        }

        var options = {
          // title: 'Weather for this week',
          legend: 'none',
          axisTitlesPosition: 'in',
          fontName: 'Segoe UI',
          fontSize: 16,
          curveType: 'function',
          focusTarget: 'category',
          width: graphWidth,
          height: graphHeight,
          chartArea: chArea,
          backgroundColor: {fill: 'transparent'},
          vAxis: {
            // textPosition: 'none',
            format: '#,###°C',
            ticks: ourTicks
          },
          lineWidth: 2,
          series: {
            0: { color: '#4972a0' },
            1: { color: '#4972a0' },
          }

          // isStacked: true,
          // bar: { groupWidth: '50%' }, // Remove space between bars.
          // candlestick: {
          //   fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
          //   risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
          // }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
}
