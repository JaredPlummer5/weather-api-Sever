const axios = require('axios');
const NodeCache = require("node-cache");

const movieCache = new NodeCache();
exports.movie = function (req, res) {
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

    let { searchQuery } = req.query;
    const url = `https://api.themoviedb.org/3/search/multi?api_key=86643b90f50b06dcb8c9661ec2b8b998&query=${searchQuery}`;
    let cacheKey = searchQuery;

    let movieCacheData = movieCache.get(cacheKey);

    let moviesArray;

    if (movieCacheData) {
        if (movieCacheData.length === 0) {
            // Return an error response if no movies are found
            res.status(500).json({ error: 'Movie Not Found' });
        } else {
            res.send(movieCacheData); // Respond with the array of mapped movie data
        }
        console.log("movieCacheData", movieCacheData);
    } else {
        console.log("API Call");
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

                let ttl = 3600;
                movieCache.set(cacheKey, moviesArray, ttl);

                if (moviesArray.length === 0) {
                    // Return an error response if no movies are found
                    res.status(500).json({ error: 'Movie Not Found' });
                } else {
                    res.send(moviesArray); // Respond with the array of mapped movie data
                }
            });
    }
};
