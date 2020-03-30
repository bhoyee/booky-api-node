const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

//get all customer
router.get('/', async( req, res ) => {
    const customer = await Customer.find().sort('name');
    res.status(200).send(customer);
})

// create new customer
router.post('/', async ( req, res ) => {
   
    try {
        // validate user input
        const { error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
         // retriving user input  
        const customer = new Customer ({
           name: req.body.name,
           isGold: req.body.isGold,
           phone: req.body.phone,
           email: req.body.email 
        })
        //save data to db
        await customer.save();
        res.send(customer);
    }
    catch(err) {
        res.status(400).send(err.message);
    }  
})

// update customer data 
router.put('/:id', async (req, res) => {

     // validate user input
      const { error } = validate(req.body);
      if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate ( req.params.id, 
          {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone,
            email: req.body.email 
          },
          { new: true}
        )
    if(!customer) return res.status(400).send('ID not found!');
    res.status(200).send({status: 200, data: [ customer ], message: 'Updated Successful'});
})

 //delete customer data
 router.delete('/:id', async (req, res) => {
    
        // find and delete customer data by ID
     const customer = await Customer.findByIdAndRemove(req.params.id);
     if(!customer) return res.status(400).send('ID not found');

     res.status(200).send({status: 200, data: [ customer ], message: 'Delete Successful'});
 })
 // get single customer 
 router.get('/:id', async (req, res) => {
   
     const customer = await Customer.findById(req.params.id);
     if(!customer) return res.status(404).send('ID not found');

     res.status(200).send({status: 200, data: [ customer ], message: 'Suceesful'});
 })


module.exports = router;