
const axios = require('axios');
let inMemory ={};


function handlerWeather(req,res){
    let citySeach = req.query.city;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${citySeach}&key=${process.env.WEATHER_API}`;
    if(inMemory[citySeach] !== undefined){
        res.json(inMemory[citySeach])
    }else{

    
    axios.get(url).then(element => {
        console.log(element.data);
        let weatherData = element.data.data;
        let newweather = [];

        weatherData.map((item) => {
            newweather.push(new Forecast(item))
        });
        
        inMemory[citySeach]=newweather;
        res.json(newweather);
    }).catch(error => res.status(500).send(error.message));
}

}

class Forecast {

    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }
}

module.exports = handlerWeather;