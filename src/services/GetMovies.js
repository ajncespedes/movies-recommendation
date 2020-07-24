import { OMDB_API_KEY, OMDB_URL, TASTEDIVE_API_KEY, TASTEDIVE_URL, CORS_ANYWHERE_API } from '../util/Constants';

export async function getMovieById({ id }) {
    const data = await fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&i=${id}&type=movie`);
    const movie = await data.json();

    return movie;
}

export async function getMovieByName({ Name }) {
    const data = await fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${Name}&type=movie`);
    const dataJson = await data.json();
    const movie = dataJson.Search ? dataJson.Search[0] : null;
    console.log('Movies with the name: ' + Name, dataJson.Search);

    return movie;
}

export async function getSimilarMovies({ Title }) {
    const data = await fetch(`${CORS_ANYWHERE_API}${TASTEDIVE_URL}?apikey=${TASTEDIVE_API_KEY}&q=${Title}&type=movies&info=1&limit=8`);
    const dataJson = await data.json();
    const movies = dataJson.Similar.Results;

    console.log('Movies similar to: ' + Title, movies);

    let newMovies = [];
    for(const movie of movies) {
        const newMovie = await getMovieByName(movie);
        if(newMovie !== null){
            newMovies.push(newMovie);
        }
    }
    return newMovies;
}