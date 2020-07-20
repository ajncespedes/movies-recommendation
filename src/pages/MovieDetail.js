import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonBackToHome } from '../components/ButtonBackToHome';
import { OMDB_API_KEY, OMDB_URL } from '../util/Constants';

export class MovieDetail extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    };

    state = { movie: {} };

    _fetchMovie({ id }) {
        fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&i=${id}&type=movie`)
        .then(res => res.json())
        .then(movie => {
            console.log(movie);
            this.setState({ movie });
        });
    }

    componentDidMount() {
        console.log(this.props);
        const { id } = this.props.match.params;
        this._fetchMovie({ id });
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
            </div>
        )
    }
}