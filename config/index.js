const { LocalStorage } = require('node-localstorage');

module.exports = {
  jwtSecret: 'secretToken',
  localStorage: new LocalStorage('./scratch'),
};
