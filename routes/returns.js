const express = require('express');
const router = express.Router();
const {Rental} = require('../models/rental');
const auth = require('../middleware/auth');
const moment = require('moment');

//get all categories
// router.post('/', async (req, res) => {
//  res.status(401).send('Unauthorized');
  
// });

router.post('/', auth, async (req, res) => {
    
    if(!req.body.customerId) return res.status(400).send('Invalid CustomerId');  
    if(!req.body.bookId) return res.status(400).send('Invalid BookId');  

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'book._id': req.body.bookId
    });

    if (!rental) return res.status(404).send('Rental not found.');

    if (rental.dateReturned) return res.status(400).send('Return already processed');

    rental.dateReturned = new Date() * 1;
    await rental.save();

    return res.status(200).send();
    
});

module.exports = router;