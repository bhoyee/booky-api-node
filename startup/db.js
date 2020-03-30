const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    //connecting to Mongo DB
mongoose.connect('mongodb://localhost/bookyDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => winston.info('Connected to BookyDB...'))

}