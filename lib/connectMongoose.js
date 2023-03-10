'use strict';
//Loading libraries
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

//Events to handle errors
mongoose.connection.on('error', err => {
    console.log('MongoDB connection error', err);
    process.exit(1);
});

//Event that shows message when the connection is stablished
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB at', mongoose.connection.name);
});

//Connection to the database
mongoose.connect('mongodb://127.0.0.1/nodepopAds');

module.exports = mongoose.connection;