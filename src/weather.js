const axios = require('axios');

exports.forcast = function (req, res) {
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
}