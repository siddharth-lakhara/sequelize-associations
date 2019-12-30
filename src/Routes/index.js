const ping = require('./ping');
const users = require('./users');

module.exports = [
  ...ping,
  ...users,
];
