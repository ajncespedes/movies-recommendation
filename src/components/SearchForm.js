import React, { useState } from 'react';
import { OMDB_API_KEY, OMDB_URL } from '../util/Constants';

const SearchForm = ({ onResults }) => {
    const [inputMovie, setInputMovie] = useState('');

    const onChange = e => {
        setInputMovie(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        
        fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${inputMovie}&type=movie`)
        .then(res => res.json())
        .then(results => {
            const { Search = [], totalResults = "0" } = results;
            console.log({ Search, totalResults});
            onResults(Search);
        });
    };

    return (
        <form onSubmit={e => onSubmit(e)}>
            <div className="field is-grouped">
                <p className="control">
                    <input className="input" onChange={e => onChange(e)} type="text" placeholder="Movie to search..." />
                </p>
                <p className="control">
                    <button className="button is-info">
                    Search
                    </button>
                </p>
            </div>
        </form>
    );
}

export default SearchForm;