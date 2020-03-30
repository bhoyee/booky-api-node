 const express = require('express');
 const _ = require('lodash');
 const router = express.Router();
 const mongoose = require('mongoose');
 const {User, validate} = require('../models/user');
 const bcrypt = require('bcrypt');
 const auth = require('../middleware/auth');


 router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
    
});
 
 router.get('/', async (req, res) => {
     const user = await User.find().sort('-regDate');
     res.send(user);
 })

 router.post('/', async (req, res) => {
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     let user = await User.findOne({email: req.body.email});
      if(user) return res.status(400).send('User already exit with email');
     
      user = new User (_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
     
      await user.save();
    
      const token = user.generateAuthToken();
      res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

     });

 router.put('/:id', async (req, res) => {
     const user = await User.findByIdAndUpdate(req.params.id, {
         name: req.body.name, 
         email: req.body.email,
        password: req.body.password,
       
     }, 
     {new: true});

     if(!user) return res.send(400).send('User not found');

     res.send(user);
 });

 router.delete('/:id', async (req, res) => {
     const user = await User.findByIdAndRemove(req.params.id);
     if(!user) return res.status(400).send('User not found');

     res.send(user);
 });

 
 module.exports = router;