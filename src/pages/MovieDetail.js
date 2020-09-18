import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BreadCrumb from '../components/BreadCrumb';
import MoviesList from '../components/MoviesList';
import Title from '../components/Title';
import { getMovieById, getSimilarMovies } from '../services/GetMovies';


const MovieDetail = (props) => {
    const [movie, setMovie] = useState({});
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(true);

    const renderSimilarMovies = () => {
        if(loadingMovies) {
            return (
                <div className="has-text-centered">
                    <div className="lds-dual-ring"></div>
                    <h1 className="title is-3">Loading...</h1>
                </div>);
        } else {
            return similarMovies.length === 0
            ? <p>No similar movies found</p>
            : <MoviesList movies={similarMovies} />
        }
    };

    useEffect(() => {
        const searchMovies = async () => {
            const { id } = props.match.params;
            
            const movie = await getMovieById({ id });
            setMovie(movie);

            const similarMovies = await getSimilarMovies(movie);
            setSimilarMovies(similarMovies);

            setLoadingMovies(false);
        };

        searchMovies();
    }, [props]);

    return (
        <div>
            <div className="columns">
                <div className="column is-4">
                    <BreadCrumb />
                    <br/>
                    <br/>
                    <img src={movie.Poster} alt={movie.Title}/>
                </div>
                <div className="column">
                    <div className="MovieContent">
                        <Title style={{color: "#fff !important"}}>{movie.Title} ({movie.Year})</Title>
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
            {renderSimilarMovies()}
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