// after document is ready
$(document).ready( () => {
    console.log('its ready!');
    // $('body').css("background", "red") //  /*background: url(bg2.jpg) no-repeat center center fixed;*/

    // show home button and search bar
    $( "#homeButton").slideDown("slow");
    $( "#searchform").slideDown("slow");

    // home button click event handler to reload page.
    $( "#homeButton").click( () => {
      location.reload();
    });

    //lets get the value submited and query our /data endpoint, then draw chart and .slideDown jumbotron
    $( "#searchform" ).submit(function( event ) {
      // Stop form from submitting normally
      event.preventDefault();
      // Get some values from elements on the page:
      var Address = $('#searchbox').val();

      $.ajax({
           url: '/data',
           type: 'POST',
           contentType: 'application/json',
           data: JSON.stringify({
               address: Address
           })
       }).done((data) => {
        //  console.log(data);
         drawOurChart(data);
         $(".jumbotron").slideDown("slow");
       });
    });
});
