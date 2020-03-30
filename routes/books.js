const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Book, validate} = require('../models/book');
const {Category} = require('../models/category');


router.get('/', async (req, res) => {

  const books = await Book.find().sort('title');

  res.status(200).send(books);
});

router.post('/', async (req, res) => {

    try{
        const { error } = validate(req.body);
        if(error) return res.send(400).send(error.details[0].message);
    
        const category = await Category.findById(req.body.categoryId);
        if(!category) return res.status(400).send('Invalid Book Category');
    
        const book = new Book({
            title: req.body.title,
            category: {
                _id: category._id,
                name: category.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })
    
       await book.save();
        res.send(book)
    }
    catch(err) {
        console.log(err.message);
    }
   
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.send(400).send(error.details[0].message);
    
    const category = await Category.findById(req.body.categoryId);
    if(!Category) return res.status(400).send('Invalid Book Category');

    const book = await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title, 
        category: {
            _id: category._id,
            name: category.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true });

    if(!book) return res.status(404).send('BookID not Found');

    res.send(book);
})

router.delete('/:id', async (req, res) => {
   
    const book = await Book.findByIdAndRemove(req.params.id);
    if(!book) return res.status(404).send('BookId not found');

    res.send(book);
})

router.get('/:id', async (req, res) => {

    const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).send('BokID not found');

    res.send(book);
})


module.exports = router;