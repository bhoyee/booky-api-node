const mongoose = require('mongoose');
const Joi = require("joi");
require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require('config');


const registerScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50

    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1025
    },
    regDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

});

registerScheme.methods.generateAuthToken = function() {

    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin },
          config.get('jwtPrivateKey'));
     return token;
}

const User = mongoose.model('User', registerScheme);

function validateUser(user) {

    const schema = {
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().email(),
        password:  Joi.string().required().min(3).max(50),
        isAdmin: Joi.boolean()
       
    }

    return Joi.validate(user, schema);
}


module.exports.User = User;
module.exports.validate = validateUser;