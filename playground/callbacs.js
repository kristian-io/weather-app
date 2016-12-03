var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Kristian'
  };

  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(31, (user) => {
  console.log(user);
});





// https://maps.googleapis.com/maps/api/geocode/json?address=Bratislava vajnorska 100B
