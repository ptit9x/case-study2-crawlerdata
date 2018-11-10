const getLink = require('./pages/kenh14-link');
const CronJob = require('cron').CronJob;
// '* * * * * *' - runs every second
// '*/5 * * * * *' - runs every 5 seconds
// '10,20,30 * * * * *' - run at 10th, 20th and 30th second of every minute
// '0 * * * * *' - runs every minute
// '0 0 * * * *' - runs every hour (at 0 minutes and 0 seconds)

new CronJob('0 * * * * *', () => {
  console.log('You will see this message every minute');
  getLink();
}, null, true, 'America/Los_Angeles');