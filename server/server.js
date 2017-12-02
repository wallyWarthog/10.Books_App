// require modules 
const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');

const Book = require('./models/books').Book;
const {Store} = require('./models/stores');

// create an instance of express, and use the Body Parser
const app = express();
app.use(BodyParser.json());

// create port for Heroku and localhost
const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`started on port ${port}`);
});

// create DB
mongoose.Promise = global.Promise; 
url = 'mongodb://localhost:27017/book_db';
mongoose.connect(url);

// html middelware
app.use('/', express.static(__dirname + '/../public'));

// Routes
// POST
    // add store 
app.post('/api/add/store', (req, res)=>{
    
    const store = new Store({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    });

    store.save((err, doc)=>{
        if(err) res.status(400).send();
        res.status(200).send();
    });
});

    // add book 
app.post('/api/add/books', (req, res)=>{
    
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages,
        price: req.body.price,
        stores: req.body.stores
    });

        book.save((err, doc) => {
        if(err) res.status(400).send();
        res.status(200).send();
    });

})

// GET
app.get('/api/stores', (req, res)=>{
    
    Store.find((err, doc)=>{
        if(err) res.status(400).send();
        res.send(doc);
    })
})

app.get('/api/books', (req, res)=>{
    
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let order = req.query.ord ? req.query.ord : 'asc';

    Book.find().sort({_id:order}).limit(limit).exec((err, doc)=>{
        if(err) res.status(400).send();
        res.send(doc);
    });

});

app.get('/api/books/:id', (req, res)=>{
    Book.findById(req.params.id, (err, doc)=>{
        if(err) res.status(400).send(err);
        res.send(doc);
    })
});

// Patch 

app.patch('/api/add/books/:id', (req, res)=>{
    Book.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
});

// Delete

app.delete('/api/delete/books/:id', (req, res)=>{
    Book.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).send();
    })
})