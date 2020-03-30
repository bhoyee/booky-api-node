const {Rental, validate } = require('../models/rental');
const {Book} = require('../models/book');
const { Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fawn = require('fawn');


fawn.init(mongoose);

router.get('/', async (req, res) => {

    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});
router.post('/', async (req, res) => {
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);
     
     const customer = await Customer.findById(req.body.customerId);
     if(!customer) return res.status(400).send('Invalid Customer!');

     const book = await Book.findById(req.body.bookId);
     if(!book) return res.status(400).send('Invalid Book!');
     
     if(book.numberInStock === 0) return res.status(400).send('Book not in Stock');

     let rental = new Rental({
        customer: {
            _id: customer._id,
             name: customer.name,
            phone: customer.phone
        },
        book: {
            _id: book._id,
            title: book.title,
            dailyRentRate: book.dailyRentRate
        }
     });
        try {

            new fawn.Task()
                .save('rentals', rental)
                .update('books', { _id: book._id }, { 
                    $inc: { numberInStock: -1 }
                })
                .run();
                res.send(rental);
        }
        catch(ex) {
            res.status(500).send('error: ' + ex.message + ' Something went wrong');
        }   
      
})
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.send(400).send('Rental with given ID not found');

    res.send(rental);
});

module.exports = router;
