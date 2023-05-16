require('dotenv').config(); // Load environment variables from .env file

const express = require('express'); // Import the Express framework
const cors = require('cors'); // Enable Cross-Origin Resource Sharing (CORS)
const axios = require('axios'); // HTTP client for making API requests

const app = express(); // Create an Express application
app.use(cors()); // Enable CORS for all routes

const PORT = process.env.PORT || 9000; // Set the port number from environment variables or use 9000 as the default port

app.get('/', async function (req, res) {
    res.send("hello"); // Respond with "hello" for the root URL
});

app.get('/damovies', (req, res) => {
    let { searchQuery } = req.query;
    res.send("lets watch " + searchQuery); // Respond with "lets watch [searchQuery]" for the '/damovies' endpoint
});

app.get('/weather', function (req, res) {
    const { city } = req.query;
    const api = 'eb1a646a8644433db25fe7d36799fb2a';
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${api}`;

    // Make an API request to get weather data for the specified city
    let weatherData = axios.get(url)
        .then(response => {
            // Map the weather data response to create an array of Forecast objects
            let mappingWeatherData = response.data.data.map(element => {
                let newForcast = new Forecast(element.datetime, element.weather.description, response.data.lon, response.data.lat, response.data.city_name);
                return newForcast;
            });
            res.send(mappingWeatherData); // Respond with the mapped weather forecast data
        })
        .catch(error => res.send(error.message)); // Handle any errors that occur during the API request
});

app.get('/movies', function (req, res) {
    let { searchQuery } = req.query;
    const url = `https://api.themoviedb.org/3/search/multi?api_key=86643b90f50b06dcb8c9661ec2b8b998&query=${searchQuery}`;

    let moviesArray;
    // Make an API request to search for movies using the specified query
    axios.get(url)
        .then(response => {
            const data = response.data;
            // Map the movie data response to create an array of Movie objects
            moviesArray = data.results.map(element => {
                let image_url;
                if ((element.poster_path !== null && element.poster_path !== undefined) || (element.profile_path !== null && element.profile_path !== undefined) || (element.backdrop_path !== null && element.backdrop_path !== undefined)) {
                    // Set the image URL based on available poster, profile, or backdrop paths
                    image_url = 'https://image.tmdb.org/t/p/w500' + element.poster_path || 'https://image.tmdb.org/t/p/w500' + element.profile_path || 'https://image.tmdb.org/t/p/w500' + element.backdrop_path || 'https://image.tmdb.org/t/p/w500' + element.known_for.backdrop_path;
                } else {
                    // Set a default image URL if no valid paths are available
                    image_url = `https://fakeimg.pl/1600x400?text=${element.title || element.name || element.original_title || element.original_name}`;
                }
                return new Movie(element.title || element.name || element.original_title || element.original_name, element.overview, element.vote_average, element.vote_count, image_url, element.popularity, element.released_date, element.id);
            });
            
        
                    if (moviesArray.length === 0) {
                        // Return an error response if no movies are found
                        res.status(500).json({ error: 'Movie Not Found' });
                    } else {
                        res.send(moviesArray); // Respond with the array of mapped movie data
                    }
                });
            });
            
            app.listen(PORT); // Start the Express server on the specified port
            
            // Define a Forecast class to represent weather forecast data
            class Forecast {
            constructor(date, description, lon, lat, city_name, id) {
            this.date = date;
            this.description = description;
            this.lon = lon;
            this.lat = lat;
            this.city_name = city_name;
            this.id = id;
            }
            }
            
            // Define a Movie class to represent movie data
            class Movie {
            constructor(title, overview, vote_average, vote_count, poster_path, popularity, released_date) {
            this.title = title;
            this.overview = overview;
            this.vote_average = vote_average;
            this.vote_count = vote_count;
            this.poster_path = poster_path;
            this.popularity = popularity;
            this.released_date = released_date;
            }
            }