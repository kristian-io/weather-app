const yargs = require('yargs');

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
