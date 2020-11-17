const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import seed data
const dbSeed = require(`./seeds/shoes.js`);

// Define model
const Shoe = require(`./models/Shoe.js`);
const shoes = require('./seeds/shoes.js');

/*******************************/
/* Mongoose/MongoDB Connection */
/*******************************/

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function (error) {
    console.log(`Connection Error: ${error.message}`)
});

db.once('open', function () {
    console.log('Connected to DB...');

});

Shoe.insertMany(dbSeed, function (error, shoe) {
    console.log('Data import completed.')
    console.log(shoes);
    mongoose.connection.close();
});