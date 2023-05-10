// Require the dotenv package to read environment variables from .env file
require('dotenv').config();

// Require the express package to create a web application and API endpoints
const express = require('express');

// Require the cors package to enable Cross-Origin Resource Sharing (CORS) in the API
const cors = require('cors');

// Require the weather data from a local file called weather.json
const data = require('./data/weather.json');

// Create an instance of the express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Define an API endpoint for weather data
app.get('/weather', function (req, res) {

    // Extract the values of the lat, lon, and searchQuery query parameters from the request
    let { lat, lon, searchQuery } = req.query;

    // Print the values of the lat, lon, and searchQuery query parameters to the console
    console.log(lat, lon, searchQuery);

    // Find the first element in the weather data that matches the searchQuery, lat, or lon values
    let dataFinder = data.find(element => {
        if (searchQuery === element.city_name || element.lat == lat || element.lon == lon) {
            return true;
        } else {
            return false;
        }
    });

    let error;

    // If there is no data found for the searchQuery, lat, or lon values, return a 500 error with an error message
    if (dataFinder === undefined) {
        error = { message: "Error: Please enter one of the locations listed to see the weather: Seattle, Paris, or Amman" }
        return res.status(500).send(error);
    }

    // Map the forecast data for the selected city to a new array of Forecast objects
    let dataForecast = dataFinder.data.map(element => {
        return new Forecast(element.valid_date, element.weather.description, dataFinder.lon, dataFinder.lat, dataFinder.city_name)
    });

    // Send the forecast data as a response to the client
    res.send(dataForecast);
});

// Start the web server and listen for incoming requests on port 3001
app.listen(3001);

// Define a Forecast class to represent weather forecast data
class Forecast {
    constructor(date, description, lon, lat, city_name) {
        this.date = date;
        this.description = description;
        this.lon = lon;
        this.lat = lat;
        this.city_name = city_name
    }
}
