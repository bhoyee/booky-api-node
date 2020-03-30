const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
 
// log all ex to logfile
winston.exceptions.handle(
    new winston.transports.File ({ filename: 'logfile.log'}));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

// log ex to database
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/booky',
    level: 'info'
}));
}