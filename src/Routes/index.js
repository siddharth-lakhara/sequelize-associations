const ping = require('./ping');
const users = require('./users');
const posts = require('./posts');

module.exports = [
  ...ping,
  ...users,
  ...posts,
];
