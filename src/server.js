require('dotenv').config(); // Load environment variables from .env file

const express = require('express'); // Import the Express framework
const cors = require('cors'); // Enable Cross-Origin Resource Sharing (CORS)
const axios = require('axios'); // HTTP client for making API requests
const weather = require('./weather');
const moviesJs = require('./movie');
const app = express(); // Create an Express application
app.use(cors()); // Enable CORS for all routes

const PORT = process.env.PORT || 9000; // Set the port number from environment variables or use 9000 as the default port
module.exports = app

app.get('/', async function (req, res) {
    res.send("hello"); // Respond with "hello" for the root URL
});


app.get('/damovies', (req, res) => {
    let { searchQuery } = req.query;
    res.send("lets watch " + searchQuery); // Respond with "lets watch [searchQuery]" for the '/damovies' endpoint
});


app.get('/weather', weather.forcast)

app.get('/movie', moviesJs.movie)

app.listen(PORT); // Start the Express server on the specified port


