import React, { Component } from 'react';
import { OMDB_API_KEY, OMDB_URL } from '../util/Constants';

export class SearchForm extends Component {
    state={
        inputMovie: ''
    }

    _handleChange = (e) => {
        this.setState( {inputMovie: e.target.value} );
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { inputMovie } = this.state;
        
        fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${inputMovie}&type=movie`)
        .then(res => res.json())
        .then(results => {
            const { Search = [], totalResults = "0" } = results;
            console.log({ Search, totalResults});
            this.props.onResults(Search);
        });
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit}>
                <div className="field is-grouped">
                    <p className="control">
                        <input className="input" onChange={this._handleChange} type="text" placeholder="Movie to search..." />
                    </p>
                    <p className="control">
                        <button className="button is-info">
                        Search
                        </button>
                    </p>
                </div>
            </form>
        )
    }
}