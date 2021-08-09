const express = require('express')
const data = require('./data/weather.json');
const app = express()
const cors = require('cors');
app.use(cors())
require('dotenv').config();
const PORT = process.env.PORT;
const axios = require('axios');
const PORT = process.env.PORT

app.get('/myData', function (req, res) {

    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;

    let findData = () => {
        let city = myData.find((city, idx)=>{
            return city.city_name === searchQuery
        })

        return city.data.map(item => {
            return new Forecast(item)
        })
    }

    res.json(findData());
});

app.listen(8000, () => {
    (
        console.log('listining')
    )
})



class Forecast {

    constructor(wheatherData) {
        this.data = wheatherData.data.valid_date;
        this.data = wheatherData.data.weather.description
    }
}