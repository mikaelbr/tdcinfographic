var config = require('../config/cli');
var spawn = require('child_process').spawn;

module.exports = function () {
  return spawn('python', ['-u', config.cliPath]);
};