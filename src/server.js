require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 9000;

app.get('/', async function (req, res) {
    res.send("hello")
})

app.get('/damovies', (req, res) => {
    let { searchQuery } = req.query;
    res.send("lets watch " + searchQuery)
})

app.get('/weather',  function (req, res) {

    const { city } = req.query;
    const api = 'eb1a646a8644433db25fe7d36799fb2a'
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${api}`
    
    let weatherData = axios.get(url)
        .then(response => {
            let mappingWeatherData = response.data.data.map(element => {
                let newForcast = new Forecast(element.datetime, element.weather.description, response.data.lon, response.data.lat, response.data.city_name);
                return newForcast;
            })
            res.send(mappingWeatherData)
        })
        .catch(error => res.send(error.message))


});

app.get('/movies', function (req, res) {
    let { searchQuery } = req.query
    const url = `https://api.themoviedb.org/3/search/multi?api_key=86643b90f50b06dcb8c9661ec2b8b998&query=${searchQuery}`;
    let moviesArray
    const response = axios.get(url)
        .then(response => {
            const data = response.data
            moviesArray = data.results.map(element => {
                let image_url
                if ((element.poster_path !== null && element.poster_path !== undefined) || (element.profile_path !== null && element.profile_path !== undefined) || (element.backdrop_path !== null && element.backdrop_path !== undefined)) {
                    image_url = 'https://image.tmdb.org/t/p/w500' + element.poster_path || 'https://image.tmdb.org/t/p/w500' + element.profile_path || 'https://image.tmdb.org/t/p/w500' + element.backdrop_path || 'https://image.tmdb.org/t/p/w500' + element.known_for.backdrop_path
                } else {
                    image_url = `https://fakeimg.pl/1600x400?text=${element.title || element.name || element.original_title || element.original_name}`
                }
                return new Movie(element.title || element.name || element.original_title || element.original_name, element.overview, element.vote_average, element.vote_count, image_url , element.popularity, element.released_date, element.id)
            })
            res.send(moviesArray);
        }).catch(error => {
            console.error(error);

            res.status(500).json({ error: 'Internal server error' });


        });

});

app.listen(PORT)


// Define a Forecast class to represent weather forecast data
class Forecast {
    constructor(date, description, lon, lat, city_name, id) {
        this.date = date;
        this.description = description;
        this.lon = lon;
        this.lat = lat;
        this.city_name = city_name;
        this.id = id
    }
}

class Movie {
    constructor(title, overview, vote_average, vote_count, poster_path, popularity, released_date) {
        this.title = title,
            this.overview = overview,
            this.vote_average = vote_average,
            this.vote_count = vote_count,
            this.poster_path = poster_path,
            this.popularity = popularity,
            this.released_date = released_date
    }
}