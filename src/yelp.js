const axios = require('axios');
const NodeCache = require("node-cache");
let yelpCache = new NodeCache()
exports.yelpRestuarant = function (req, res) {
    class Restaurants{
        constructor(id, restuarant, url, image_url, price, display_address, rating) {
            this.id = id
            this.restuarant = restuarant
            this.url = url
            this.image_url = image_url
            this.price = price
            this.display_address = display_address
            this.rating = rating
        }
    }
    let { searchQuery } = req.query
    let key = { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
    axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurants&location=${searchQuery}`, { headers: key })
        .then(response => {
            let yelpRestuarantData = response.data.businesses.map(element => {
                return new Restaurants(element.id, element.name,element.url ,element.image_url, element.price, element.location.display_address, element.rating)
            })
            res.send(yelpRestuarantData);
        })
}