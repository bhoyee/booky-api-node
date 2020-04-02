const {Category, validate} = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const validator = require('mongoose-unique-validator');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
 require('express-async-errors');
 const validateObjectId = require('../middleware/validateObjectId');

//get all categories
router.get('/', async (req, res) => {
 
    const categories = await Category.find().sort('name');;
    res.status(200).send(categories);
  
});

 //get single category by ID
router.get('/:id', validateObjectId, async (req, res) => {
       
       const category = await Category.findById(req.params.id);

      if(!category) return res.status(404).send('ID not found');
  
      res.send(category); 
  
});

//post a category
router.post('/', auth, asyncMiddleware(async (req, res) => {

        let category = new Category ({ name: req.body.name })
  
        // validate user input
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        //save to db
        await category.save();
         res.send(category);
       // res.status(200).send({ status: 200, data: [ category ], message: 'Successful' });      
}));

 // update category by ID
router.put('/:id', asyncMiddleware(async (req, res) => {
   
        //validating user input
    const { error } = validate(req.body);
    if(error)return res.send(error.details[0].message);
   
    //using update first approach
    const category = await Category.findByIdAndUpdate( req.params.id, { name: req.body.name }, { new: true });
    if(!category) return res.status(404).send('ID not found');
     
      res.status(200).send({status: 200, data: [ category ], message: 'Updated Successful'});
 }));

//delete category from
router.delete('/:id', [auth, admin], asyncMiddleware(async (req, res) => {

      const category = await Category.findByIdAndRemove(req.params.id);

      if (!category) return res.status(404).send('ID not found');
  
      res.status(200).send({status: 200, data: [ category ], message: 'Delete Successful'});
        

}));

module.exports = router;
