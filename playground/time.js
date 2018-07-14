// 1 Jan 00:00:00

const moment = require('moment');

var date = moment();
date.add('1','years').subtract('9','month');
console.log(date.format('D MMM YYYY'));

console.log(date.format('H:mm'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var date2 = moment(someTimestamp);
