import React, { useState, useEffect } from 'react';
import MoviesList from '../components/MoviesList';
import NavBar from '../components/NavBar';
import firebaseDB from '../services/firebaseDB';

const Home = () => {
    const [mostLikedMovies, setMostLikedMovies] = useState([]);
    const [mostVisitedMovies, setMostVisitedMovies] = useState([]);

    const renderMostLikedMovies = () => {
        if(mostLikedMovies.length > 0) {
            return <div className="mt-4">
                        <p className="title is-3">Most liked movies</p>
                        <MoviesList movies={mostLikedMovies} />
                    </div>
        }
    };

    const renderMostVisitedMovies = () => {
        if(mostLikedMovies.length > 0) {
            return <div>
                        <p className="title is-3">Most visited movies</p>
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
            <NavBar />
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