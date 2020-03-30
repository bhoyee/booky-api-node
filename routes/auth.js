const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', async (req, res) => {
    const {error} = await validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const user = await  User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Username or Password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
     if(!validPassword) return res.status(400).send('Invalid Username or Password');

     const token = user.generateAuthToken();   
     res.send(token);

})

function validate(auth) {

    const schema = {
        email: Joi.string().required().email(),
        password:  Joi.string().required().min(3).max(50)
       
    }

    return Joi.validate(auth, schema);
}


module.exports = router