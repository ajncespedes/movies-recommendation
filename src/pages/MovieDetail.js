import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonBackToHome } from '../components/ButtonBackToHome';
import { MoviesList } from '../components/MoviesList';
import { getMovieById, getSimilarMovies } from '../services/GetMovies';



export class MovieDetail extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    };

    state = { movie: {}, similarMovies: [] };

    _renderSimilarMovies() {
        return  this.state.similarMovies.length === 0
            ? <p>No similar movies found</p>
            : <MoviesList movies={this.state.similarMovies} />
    }

    async componentDidMount() {
        console.log(this.props);
        const { id } = this.props.match.params;
        
        const movie = await getMovieById({ id });
        this.setState({ movie });

        const similarMovies = await getSimilarMovies(movie);
        this.setState({ similarMovies });
    }

    render() {
        const { Title, Poster, Actors, Metascore, Plot } = this.state.movie;
        return (
            <div>
                <ButtonBackToHome />
                <h1>{Title}</h1>
                <img src={Poster} alt={Title}/>
                <h3>{Actors}</h3>
                <span>{Metascore}</span>
                <p>{Plot}</p>
                <p className="title">Recomendations</p>
                {this._renderSimilarMovies()}
            </div>
        )
    }
}
