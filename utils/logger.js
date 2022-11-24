const { format, createLogger, transports } = require('winston');
const moment = require('moment');

const { timestamp, prettyPrint, combine } = format;

const fileName = moment(new Date()).format('YYYY-MM-DD HH-mm-ss');

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `logs/${fileName}.log`
    })
  ]
});

// In real app we should think a bit about log rotation...

module.exports = logger;
