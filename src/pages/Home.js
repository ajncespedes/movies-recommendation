import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';
import Spinner from '../components/Spinner';
import firebaseDB from '../services/firebaseDB';

const Home = () => {
    const [usedSearch, setUsedSearch] = useState(false);
    const [results, setResults] = useState([]);
    const [inputMovie, setInputMovie] = useState("");
    const [loading, setLoading] = useState(false);
    const [mostLikedMovies, setMostLikedMovies] = useState([]);
    const [mostVisitedMovies, setMostVisitedMovies] = useState([]);

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

    const renderMostLikedMovies = () => {
        if(mostLikedMovies.length > 0) {
            return <div>
                        <p className="title is-4">Most liked movies</p>
                        <MoviesList movies={mostLikedMovies} />
                    </div>
        }
    };

    const renderMostVisitedMovies = () => {
        if(mostLikedMovies.length > 0) {
            return <div>
                        <p className="title is-4">Most visited movies</p>
                        <MoviesList movies={mostVisitedMovies} />
                    </div>
        }
    };

    useEffect(() => {
        firebaseDB.getMostLikedMovies(8).on("value", snapshot => {
            let likedMovies = [];
            snapshot.forEach(movie => {
                likedMovies.push(movie.val());
            });
            setMostLikedMovies(likedMovies.reverse());
        });
        firebaseDB.getMostVisitedMovies(8).on("value", snapshot => {
            let visitedMovies = [];
            snapshot.forEach(movie => {
                visitedMovies.push(movie.val());
            });
            setMostVisitedMovies(visitedMovies.reverse());
        });

        return () => {
            firebaseDB.getMostLikedMovies(8).off("value");
            firebaseDB.getMostVisitedMovies(8).off("value");
        }
    }, []);
    
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
            {
                renderMostLikedMovies()
            }
            {
                renderMostVisitedMovies()
            }
        </div>
    );
}

export default Home;