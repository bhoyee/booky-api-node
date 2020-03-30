const Joi = require('joi');
const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');


//creating DB schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        sparse:true,
        index:true,
        minlength: 5,
        maxlength: 255
    }
});

// creating DB model
const Category = mongoose.model('Category', categorySchema);

// func that handling validation
function validateCategory(category) {
    const schema = {
        name: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;
