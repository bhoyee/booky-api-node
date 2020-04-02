
const express = require('express');
const categories = require('../routes/categories');
const customers = require('../routes/customers');
const books = require('../routes/books');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const error = require('../middleware/error');


module.exports = function(app) {
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//calling the category module
app.use('/api/categories', categories);
app.use('/api/customers', customers);
app.use('/api/books', books);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/returns', returns);
app.use(error);

}