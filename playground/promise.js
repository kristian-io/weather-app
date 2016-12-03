var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a+b);
      } else {
        reject('Argumets are not a numbers')
      }
    }, 1500);
  })
};


asyncAdd(2,39).then((res) => {
  console.log('results: ', res);
  return asyncAdd(res, 33);
}, (errorMessage) => {
  console.log('error');
}).then((res) => {
    console.log(res);
}), (error) => {
  console.log(error);
}



//
// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//       // resolve('it worked');
//       reject('Unable to fulfill promise')
//   }, 2000);
// });
//
//
// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log(errorMessage);
// })
