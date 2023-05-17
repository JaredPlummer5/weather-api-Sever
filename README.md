# Sever and Clients

**Author**: Jared Plummer

**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

The server is built using Express and enables Cross-Origin Resource Sharing (CORS) to allow requests from different domains. It has three main endpoints: root, `/damovies`, and `/weather`. The `/movies` endpoint fetches movie data from a third-party API, and the `/weather` endpoint fetches weather data from another API.

## Getting Started

To run this code on your machine, follow these steps:

1. Install the required dependencies by running `npm install` or `yarn install` in the project directory.

2. Set up the environment variables in a `.env` file. It should include a `PORT` variable for the server port and an API key for the weather API.

3. Start the server by running `node server.js` or using a tool like Nodemon with `nodemon server.js`.

4. Access the endpoints using a browser or an API testing tool.

### Architecture

The application is built using Node.js and Express.js for the server. It also utilizes the Axios library for making HTTP requests to external APIs.

The server listens on a specified port (default is 9000) and handles incoming GET requests to different endpoints. The `/` endpoint responds with "hello", the `/damovies` endpoint responds with "lets watch [searchQuery]", and the `/weather` and `/movies` endpoints make API requests to retrieve weather and movie data.

The weather API endpoint fetches weather data for a specified city by sending a request to the Weatherbit API. The movie API endpoint fetches movie data for a specified search query by sending a request to The Movie Database (TMDb) API. The retrieved data is then processed and returned to the client.

The server also includes two classes: `Forecast` and `Movie`. These classes represent the structure of weather forecast and movie data, respectively.

## Change Log

### 05-09-2023 2:00pm

- Initial version of the application with the ability to search for weather forecast by latitude, longitude, or city name.

### 05-16-2023 7:05pm

- Added movie API and search functionality for movies.
- Improved weather API to handle errors and provide better error messages.
- Refactored code to improve organization and readability.

## Credit and Collaborations

No credit or collaborations at this time.

## Features and Times
<!-- Lab 6  -->
Name of feature: **Weather info for certain cities**

Estimate of time needed to complete: **4 hours**

Start time: **11:44am**

Finish time: **1:45pm**

Actual time needed to complete: **2 hours**

<!-- Lab 7 -->
Name of feature: **Weather info API for all cities**

Estimate of time needed to complete: **5 hours**

Start time: **9:30am**

Finish time: **11:45pm**

Actual time needed to complete: **3 hours and 15 minutes**

<!-- Lab 8 -->
Name of feature: **Weather and Movie info API for all cities**

Estimate of time needed to complete: **24 hours**

Start time: **9:05am**

Finish time: **4:45pm**

Actual time needed to complete: **7 hours and 40 minutes**
