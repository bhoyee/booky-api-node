const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


//setting the environment port
const port = process.env.PORT || '3000';


app.use('/', (req, res) => {
    res.send('Page not found');
});

const server = app.listen(port, () =>  winston.info(`Server listerning on port ${port}`));

module.exports = server;
