const ping = require('./ping');
const users = require('./users');
const posts = require('./posts');
const groups = require('./groups');

module.exports = [
  ...ping,
  ...users,
  ...posts,
  ...groups,
];
