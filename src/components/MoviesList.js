import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

const MoviesList = ({ movies }) => {
    return (
        <div className="MoviesList">
            {
                movies.map(movie => {
                    return (
                        <div key={movie.imdbID} className="MoviesList-item">
                            <Movie 
                                id={movie.imdbID}
                                title={movie.Title}
                                year={movie.Year}
                                poster={movie.Poster}/>
                        </div>
                    );
                })
            }
            
        </div>
    );
}

MoviesList.propTypes = {
    movies: PropTypes.array
}

export default MoviesList;