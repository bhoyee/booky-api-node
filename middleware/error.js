const winston = require('winston');


module.exports = function(err, req, res, next) {

    winston.error(err.message, err);

    // error: 0, 
    // warn: 1, 
    // info: 2, 
    // verbose: 3, 
    // debug: 4, 
    // silly: 5 

    res.status(500).send('Something failed.');
}