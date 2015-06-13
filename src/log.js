var LOG_LEVEL = 'info';
var LOG_NAME = 'server';

var bunyan = require('bunyan');

var log = bunyan.createLogger({name: LOG_NAME, src: true});
log.level(LOG_LEVEL);
process.on('uncaughtException', function(err) {
	log.error(err);
});

module.exports = log;
