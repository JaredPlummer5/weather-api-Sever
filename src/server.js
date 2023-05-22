require('dotenv').config(); // Load environment variables from .env file

const express = require('express'); // Import the Express framework
const cors = require('cors'); // Enable Cross-Origin Resource Sharing (CORS)
const axios = require('axios'); // HTTP client for making API requests
const weather = require('./weather'); // Import the weather module
const moviesJs = require('./movie'); // Import the movie module
const yelp = require('./yelp'); // Import the yelp module
const app = express(); // Create an Express application

app.use(cors()); // Enable CORS for all routes

const PORT = process.env.PORT || 9000; // Set the port number from environment variables or use 9000 as the default port

app.get('/', async function (req, res) {
    res.send('hello'); // Respond with "hello" for the root URL
});

app.get('/damovies', (req, res) => {
    let { searchQuery } = req.query;
    res.send('lets watch ' + searchQuery); // Respond with "lets watch [searchQuery]" for the '/damovies' endpoint
});

app.get('/weather', weather.forecast); // Use the weather.forecast function to handle the '/weather' route

app.get('/movie', moviesJs.movie); // Use the moviesJs.movie function to handle the '/movie' route

app.get('/yelp',yelp.yelpRestuarant)

app.listen(PORT); // Start the Express server on the specified port
