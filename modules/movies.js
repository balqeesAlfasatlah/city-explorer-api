const axios = require('axios');
let inMemory ={};


function handlerMovies(req ,res){
    let movieSeach = req.query.query;


    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVE_API}&query=${movieSeach}`;
    if(inMemory[movieSeach] !== undefined){
        res.json(inMemory[movieSeach])
    }else{
    axios.get(url).then(e => {
        console.log(e.data);
        
        let movieData = e.data.results;
        let newMovie = [];

        movieData.map((item) => {
            newMovie.push(new Movies(item))
        });
        inMemory[citySeach]=newMovie;
        res.json(newMovie);
    })
    .catch(error => res.send(error.message));
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

module.exports = handlerMovies;