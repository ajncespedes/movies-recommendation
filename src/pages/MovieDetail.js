import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import MoviesList from '../components/MoviesList';
import Spinner from '../components/Spinner';
import { getMovieById, getSimilarMovies, getMeanScore, getUserScore } from '../services/MoviesService';
import firebaseService from '../services/FirebaseService';
import ScoreStars from '../components/ScoreStars';
import { useAuth } from '../contexts/AuthContext';

const MovieDetail = (props) => {
    const [movie, setMovie] = useState({});
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [meanScore, setMeanScore] = useState(0);
    const [userScore, setUserScore] = useState(0);
    const [numberOfVotes, setNumberOfVotes] = useState(0);
    const { currentUsername } = useAuth();
    const [errorVote, setErrorVote] = useState('');


    const RenderSimilarMovies = () => {
        if(loadingMovies) {
            return <Spinner/>
        } else {
            return similarMovies.length === 0
            ? <p>No similar movies found</p>
            : <MoviesList movies={similarMovies} />
        }
    };

    const scoreOnChange = (value) => {
        if(currentUsername) {
            firebaseService.getMovieByImdbID(movie.imdbID).once('value', (snapshot) => {
                let movieDB = snapshot.val();

                if(movieDB) {
                    let scores = movieDB.scores;
                    if(!scores) {
                        scores = [];
                    }

                    let userIndex = scores.findIndex((score => score.username === currentUsername));

                    if(scores[userIndex]){
                        scores[userIndex].score = value;
                    } else {
                        scores.push({username: currentUsername, score: value});
                    }
                    movieDB.scores = scores;

                    const meanScore = getMeanScore(movieDB);
                    movieDB.meanScore = meanScore;

                    setNumberOfVotes(scores.length);
                    setUserScore(value);
                    setMeanScore(meanScore);
                    
                    firebaseService.updateMovie(movieDB.imdbID, {scores: scores, meanScore: meanScore});
                    setMovie(movieDB);
                }
            });
        } else {
            setErrorVote('You need to be registered to be able to rate the film');
        }
    }

    const closeAlert = () => {
        setErrorVote('');
    }

    useEffect(() => {
        const searchMovies = async () => {
            const { id } = props.match.params;
            
            const movieAPI = await getMovieById({ id });
            if(movieAPI.Response !== "False") {
                setMovie(movieAPI);
            
                firebaseService.getMovieByImdbID(movieAPI.imdbID).once('value', (snapshot) => {
                    let movieDB = snapshot.val();
                    if(movieDB) {
                        firebaseService.updateMovie(movieAPI.imdbID, {views: movieDB.views + 1});
                    } else {
                        movieDB = firebaseService.createMovie(movieAPI);
                    }
                    const meanScore = movieDB.meanScore;
                    setMeanScore(meanScore);
                    
                    const userScore = getUserScore(currentUsername, movieDB);
                    setUserScore(userScore);
                    if(movieDB.scores){
                        setNumberOfVotes(movieDB.scores.length);
                    }
                });

                const similarMovies = await getSimilarMovies(movieAPI);
                setSimilarMovies(similarMovies);
                setLoadingMovies(false);
            }
        };

        searchMovies();
    }, [props, currentUsername]);
    
    
    return (
        <div>
            <NavBar />
            <div className="columns">
                <div className="column is-4">
                    <br/>
                    <div className="poster-stars">
                        <figure className="image">
                            { movie.Poster === "N/A" ?
                                <img src="/images/no-image.png" alt={movie.Title} /> :
                                <img src={movie.Poster} alt={movie.Title}/>
                            }
                            <ScoreStars
                                maxStars={10}
                                size={"27px"}
                                gap={"5px"}
                                inactiveColor={"#d9e8ed"}
                                meanScore={meanScore}
                                userScore={userScore}
                                numberOfVotes={numberOfVotes}
                                onChange={scoreOnChange}
                            />
                        </figure>
                    </div>
                    {errorVote && 
                        <div className="notification is-danger" style={{'marginTop': '10px'}}>
                            <button className="delete" onClick={closeAlert}></button>
                            {errorVote}
                        </div>
                    }
                </div>
                <div className="column">
                    <div className="MovieContent">
                    <p className="title">{movie.Title} ({movie.Year})</p>
                        <hr />
                        <table>
                            <tbody>
                                <tr>
                                    <td>Rating</td>
                                    <td><a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">{movie.imdbRating}</a></td>
                                </tr>
                                <tr>
                                    <td>Genre</td>
                                    <td>{movie.Genre}</td>
                                </tr>
                                <tr>
                                    <td>Runtime</td>
                                    <td>{movie.Runtime}</td>
                                </tr>
                                <tr>
                                    <td>Rated</td>
                                    <td>{movie.Rated}</td>
                                </tr>
                                <tr>
                                    <td>Director</td>
                                    <td>{movie.Director}</td>
                                </tr>
                                <tr>
                                    <td>Actors</td>
                                    <td>{movie.Actors}</td>
                                </tr>
                                <tr>
                                    <td>Plot</td>
                                    <td>{movie.Plot}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <p className="title">Recomendations</p>
            <p className="subtitle">You could also like</p>
            <RenderSimilarMovies/>
        </div>
    );
}

MovieDetail.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object,
        isExact: PropTypes.bool,
        path: PropTypes.string,
        url: PropTypes.string
    })
};

export default MovieDetail;