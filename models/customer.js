const mongoose = require('mongoose');
const Joi = require('joi');
const validator = require('mongoose-unique-validator');




//creating Customer Schema
const customerSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255 },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true, minlength: 11, maxlength: 14 },
    email: { type: String, required: true, unique: true }
})
//creating customer model
const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer(customer) {
    const Schema = {
        name: Joi.string().min(5).max(255).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(11).max(14).required(),
        email: Joi.string().required()
    }
    return Joi.validate(customer, Schema);
  }

  module.exports.Customer = Customer;
  module.exports.validate = validateCustomer;