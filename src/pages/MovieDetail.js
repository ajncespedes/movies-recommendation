import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ButtonBackToHome from '../components/ButtonBackToHome';
import MoviesList from '../components/MoviesList';
import { getMovieById, getSimilarMovies } from '../services/GetMovies';


const MovieDetail = (props) => {
    const [movie, setMovie] = useState({});
    const [similarMovies, setSimilarMovies] = useState([]);

    const renderSimilarMovies = () => {
        return similarMovies.length === 0
            ? <p>No similar movies found</p>
            : <MoviesList movies={similarMovies} />
    };

    useEffect(() => {
        const searchMovies = async () => {
            const { id } = props.match.params;
            
            const movie = await getMovieById({ id });
            setMovie(movie);

            const similarMovies = await getSimilarMovies(movie);
            setSimilarMovies(similarMovies);
        };

        searchMovies();
    }, [props]);

    const { Title, Poster, Actors, Metascore, Plot } = movie;
    return (
        <div>
            <ButtonBackToHome />
            <h1>{Title}</h1>
            <img src={Poster} alt={Title}/>
            <h3>{Actors}</h3>
            <span>{Metascore}</span>
            <p>{Plot}</p>
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