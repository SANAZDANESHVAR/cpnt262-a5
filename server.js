// Load dependencies
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ejs = require('ejs');
dotenv.config();

// Import models
const Shoes = require('./models/shoe.js');

// Create express app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// app.use is for using middleware
app.use(express.static(path.join(__dirname, 'public')));

// Set up mongoose connection
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log('Connected to DB...');
});

//"Home page" endpoint
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to  the Green  shoes </h1><p> Please enter '/api/v0/shoes' to the current endpoint/url to return an array of objects.</p><h2>or</h2><p>Please enter '/api/v0/shoes/(any  number betweeen 1011-1018)' to return object  with the id.</p>`);
});

// JSON endpoint
app.get('/api/v0/shoes', (req, res) => {
    Shoes.find({}, (err, data) => {

        err ? res.send('Could not find shoes') : res.json(data);
    });
});

// JSON endpoint. Returns objects by entering id
app.get('/api/v0/shoes/:id', (req, res) => {
    let shoeId = req.params.id;
    Shoes.findOne({ id: shoeId }, (err, data) => {
        if (err || data === null) {
            res.send('Can not this ID');
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});

// Add more middleware
app.use(function (req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

// Set port preferrence with default
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});