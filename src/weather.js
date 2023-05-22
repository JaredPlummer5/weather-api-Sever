const axios = require('axios');
const NodeCache = require("node-cache");
const forecastCache = new NodeCache();

exports.forecast = function (req, res) {
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
    const cacheKey = `${city}`;
    let forecastCacheData = forecastCache.get(`${cacheKey}`);

    if (forecastCacheData) {
        res.send(forecastCacheData);
        console.log("CacheData", forecastCacheData);
    } else {
        console.log('New data');
        // Make an API request to get weather data for the specified city
        let weatherData = axios.get(url)
            .then(response => {
                // Map the weather data response to create an array of Forecast objects
                let mappingWeatherData = response.data.data.map(element => {
                    let newForecast = new Forecast(element.datetime, element.weather.description, response.data.lon, response.data.lat, response.data.city_name);
                    return newForecast;
                });
                res.send(mappingWeatherData); // Respond with the mapped weather forecast data
                const ttl = 3600; // TTL in seconds (e.g., 1 hour)
                forecastCache.set(cacheKey, mappingWeatherData, ttl);
            }).catch(error => res.send(error.message)); // Handle any errors that occur during the API request
    }
};
