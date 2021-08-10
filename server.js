const express = require('express')
const weather = require('./data/weather.json');
const app = express()
const cors = require('cors');
app.use(cors())
require('dotenv').config();
const PORT = process.env.PORT;
const axios = require('axios');

app.get('/',  (req, res)=> {
    res.send('hello balqees')
})

app.get('/weather/:lon/:lat/:city_name', function (req, res) {
 
const data = weather.find((element)=>+element.lon === +req.params.lon &&
+element.lat === + req.params.lat &&
element.city_name === req.params.city_name);

if(data)
{
    res.send(data)
}else{

    res.send('city not found ')
}
});


app.get('/weather/:city_name', (req,res)=>{
    let newArr = [];
    const findCity =weather.find((element)=>element.city_name === req.params.city_name);
    if(findCity){
        findCity.data.map((day)=>newArr.push(new Forecast(day)));
        res.send(newArr);
    }else{
        res.send('location not found');
    }
})
    

app.listen(PORT, () => {
    (
        console.log('listining')
    )
})



class Forecast {

    constructor(city) {
        this.date = city.datetime;
        this.description = city.weather.description
    }
}