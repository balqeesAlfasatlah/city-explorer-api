const express = require('express')
const weather = require('./data/weather.json');
const app = express()
const cors = require('cors');
app.use(cors())
require('dotenv').config();
const axios = require('axios');
const PORT = process.env.PORT;



app.listen(PORT, () => {
    (
        console.log('listining')
    )
})

app.get('/', (req, res) => {
    res.send('hello balqees')
})

app.get('/weather', (req, res) => {

    let citySeach = req.query.city;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${citySeach}&key=${process.env.WEATHER_API}`
    axios.get(url).then(element => {
        console.log(element.data);
        let weatherData = element.data.data;
        let newweather = [];

        weatherData.map((item) => {
            newweather.push(new Forecast(item))
        });
        
        
        res.json(newweather);
    }).catch(error => res.status(500).send(error.message));
    
 
});




app.get('/movie', (req, res) => {

    let movieSeach = req.query.query;


    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVE_API}&query=${movieSeach}`
    axios.get(url).then(e => {
        console.log(e.data);
        
        let movieData = e.data.results;
        let newMovie = [];

        movieData.map((item) => {
            newMovie.push(new Movies(item))
        });
        res.json(newMovie);
    })
    .catch(error => res.send(error.message));

}
);

class Forecast {

    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }
}

class Movies{
    constructor(item){
        this.title = item.title;
        this.overview = item.overview;
        this.vote_average = item.vote_average;
        this.vote_count = item.vote_count;
        this.image_url = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://image.tmdb.org/t/p/w500/csE4ldFMH415Irm22kJCXd04wNL.jpg"
        this.popularity = item.popularity;
        this.released_on = item.released_on;
        
    }
}

