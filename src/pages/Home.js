import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';
import Spinner from '../components/Spinner';

const Home = () => {
    const [usedSearch, setUsedSearch] = useState(false);
    const [results, setResults] = useState([]);
    const [inputMovie, setInputMovie] = useState("");
    const [loading, setLoading] = useState(false);

    const onResults = results => {
        setUsedSearch(true);
        setResults(results);
    };

    const onInputMovie = name => {
        setInputMovie(name);
    }

    const onLoading = loading => {
        setLoading(loading);
    }
  
    const renderResults = () => {
        console.log(results);
        if(loading){
            return <Spinner/>
        }

        if(results.length === 0) {
            return <p>Movie not found</p>
        } else {
            return <div>
                        <p className="title is-4">Movies found with the name: <i>{inputMovie}</i></p>
                        <MoviesList movies={results} />
                    </div>
        }
    };
    
    return (
        <div>
            <p className="title has-text-centered">Movies recommendation</p>
            <div className="SearchForm-wrapper">
                <SearchForm onResults={onResults} onInputMovie={onInputMovie} onLoading={onLoading}/>
            </div>
            <br />
            {usedSearch
                ? renderResults()
                : <p className="has-text-centered">Use the form to search for a movie</p>
            }
        </div>
    );
}

export default Home;