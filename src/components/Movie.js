import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Movie = ({ id, poster, title, year }) => {
    return (
        <Link to={`/detail/${id}`} className="card">
            <div className="card-image">
                <figure className="image">
                    { poster === "N/A" ?
                       <img className="movie-image" src="/images/no-image.png" alt={title} /> : <img className="movie-image" src={poster} alt={title} /> 
                    }
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{title}</p>
                        <p className="subtitle is-6">{year}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

Movie.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    poster: PropTypes.string
}

export default Movie;