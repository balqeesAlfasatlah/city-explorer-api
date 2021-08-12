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


app.get('/',  (req, res)=> {
    res.send('hello balqees')
})

app.get('/weather', (req, res)=> {
    
const weatherData = weather.find(element=>{
    if(element.city_name == req.query.cityName){
        return element
    }
})
    const countryWheather = weatherData.data.map(day=>{
        return new Forecast(day.valid_date , day.weather.description)
    })
   
    res.send(countryWheather);

});



    
class Forecast {

    constructor(date,description) {
        this.date = date;
        this.description = description
    }
}




