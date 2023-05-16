# Sever and Clients

**Author**: Jared Plummer

**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

This application is a weather API that allows users to get the forecast of a specific location. The weather data is stored in a JSON file, and users can query the API using latitude, longitude, or city name. The application uses Node.js and the Express.js framework.

## Getting Started

To run this application on your local machine, you will need to have Node.js and npm (Node Package Manager) installed. Then, follow these steps:

1. Clone the repository

2. Install the dependencies by running `npm install` in the terminal

3. Run the server by running `npm start` in the terminal

The server will start running on port 3001, and you can access it by going to `http://localhost:3001/weather`.

## Architecture

This application uses Node.js and the Express.js framework to create an API server. The server listens for incoming requests and responds with weather forecast data. The weather data is stored in a JSON file, and the server retrieves the data based on the user's query.

The API server has one endpoint: `/weather`. When the server receives a GET request at this endpoint, it extracts the latitude, longitude, and search query parameters from the request. It then searches the weather data JSON file for a location that matches the search query or the latitude and longitude. If a matching location is found, the server sends back the weather forecast data for that location. If no matching location is found, the server sends back an error message.

The application also defines a `Forecast` class, which is used to create forecast objects with a specific format. This class is used to create an array of forecast objects from the weather data.

## Change Log

09-05-2023 2:00pm - Initial version of the application with the ability to search for weather forecast by latitude, longitude or city name.

## Credit and Collaborations

No credit or collaborations at this time.

## Features and Times

Name of feature: **Weather info for the city**

Estimate of time needed to complete: **4 hours**

Start time: **11:44**

Finish time: **1:45**

Actual time needed to complete: **2 hours**

