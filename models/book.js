const mongoose = require('mongoose');
const Joi = require('joi');
const {categorySchema} =  require('./category');
const validator = require('mongoose-unique-validator');


const bookSchma = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
        index:true,
       
    },
    category: {
        
        type: categorySchema,
        required: true,
       
        
       
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Book = mongoose.model('Book',  bookSchma);

function validateBook(book) {
    const Schema = {
        title: Joi.string().min(5).max(255).required(),
        categoryId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(book, Schema);
}


module.exports.Book = Book;
module.exports.validate = validateBook;
module.exports.bookSchma = bookSchma;
