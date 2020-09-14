import React, { useState } from 'react';
import Title from '../components/Title';
import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';

const Home = () => {
    const [usedSearch, setUsedSearch] = useState(false);
    const [results, setResults] = useState([]);

    const onResults = results => {
        setUsedSearch(true);
        setResults(results);
    };
  
    const renderResults = () => {
        console.log(results);
        return  results.length === 0
            ? <p>Movie not found</p>
            : <MoviesList movies={results} />
    };

    return (
        <div className="HomeSearch">
            <Title>Movies recommendation</Title>
            <div className="SearchForm-wrapper">
                <SearchForm onResults={onResults}/>
            </div>
            {usedSearch
                ? renderResults()
                : <small>Use the form to search a movie</small>
            }
        </div>
    );
}

export default Home;