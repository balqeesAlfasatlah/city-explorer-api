const express = require('express')
const weather = require('./data/weather.json');
const app = express()
const cors = require('cors');
app.use(cors())
require('dotenv').config();
const axios = require('axios');
const PORT = process.env.PORT;
const handlerWeather = require('./modules/weather');
const handlerMovies = require('./modules/movies')



app.listen(PORT, () => {
    (
        console.log('listining')
    )
})

app.get('/', (req, res) => {
    res.send('hello balqees')
})

app.get('/weather', handlerWeather);



app.get('/movie',handlerMovies);




