// 'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const data = require('./data/weather.json');

const app = express();
app.use(cors());

app.get('/weather', function (req, res) {
    let { lat, lon, searchQuery } = req.query;
    console.log(lat, lon, searchQuery);
   
    let dataFinder = data.find(element => {
        if (searchQuery === element.city_name || element.lat == lat || element.lon == lon) {
            return true;
        } else {
            return false;
        }
    });
    let error;
    console.log("dataFinder",dataFinder)
    if (dataFinder === undefined) {
        error = { message: "Error: Please enter one of the locations listed to see the weather: Seattle, Paris, or Amman" }
        return res.status(500).send(error);
    } 

    let dataForecast = dataFinder.data.map(element => {
        return new Forecast(element.valid_date, element.weather.description, dataFinder.lon, dataFinder.lat, dataFinder.city_name)
    });

    res.send(dataForecast);
});


app.listen(3001);


class Forecast {
    constructor(date, description, lon, lat, city_name) {
        this.date = date;
        this.description = description;
        this.lon = lon;
        this.lat = lat;
        this.city_name = city_name
    }

}

