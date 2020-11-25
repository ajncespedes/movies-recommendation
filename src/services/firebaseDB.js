import firebase from "../util/firebase";

const db = firebase.database().ref("Movies");

const getAllMovies = () => {
    return db;
};

const getMostLikedMovies = (limit) => {
    return db.orderByChild("score").startAt(1).limitToLast(limit);
}

const getMostVisitedMovies = (limit) => {
    return db.orderByChild("views").limitToLast(limit);
}

const getMovieByImdbID = (imdbID) => {
    return db.child(imdbID);
}

const createMovie = (movie) => {
    const movieDB = {
        ...movie,
        votes: 0,
        score: 0,
        views: 1,  
     }

     db.child(movie.imdbID).set(movieDB);

    return movieDB;
};

const updateMovie = (id, data) => {
    return db.child(id).update(data);
};

export default {
    getAllMovies,
    getMostLikedMovies,
    getMostVisitedMovies,
    getMovieByImdbID,
    createMovie,
    updateMovie,
};