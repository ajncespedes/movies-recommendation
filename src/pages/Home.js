import React, { useState, useEffect } from 'react';
import MoviesList from '../components/MoviesList';
import NavBar from '../components/NavBar';
import firebaseService from '../services/FirebaseService';

const Home = () => {
    const [mostLikedMovies, setMostLikedMovies] = useState([]);
    const [mostVisitedMovies, setMostVisitedMovies] = useState([]);

    const RenderMostLikedMovies = () => {
        if(mostLikedMovies.length > 0) {
            return <div className="mt-4">
                        <p className="title is-3">Most liked movies</p>
                        <MoviesList movies={mostLikedMovies} />
                    </div>
        }
        return null;
    };

    const RenderMostVisitedMovies = () => {
        if(mostVisitedMovies.length > 0) {
            return <div>
                        <p className="title is-3">Most visited movies</p>
                        <MoviesList movies={mostVisitedMovies} />
                    </div>
        }
        return null;
    };

    useEffect(() => {
        firebaseService.getMostLikedMovies(8).on("value", snapshot => {
            let likedMovies = [];
            snapshot.forEach(movie => {
                likedMovies.push(movie.val());
            });
            setMostLikedMovies(likedMovies.reverse());
        });
        firebaseService.getMostVisitedMovies(8).on("value", snapshot => {
            let visitedMovies = [];
            snapshot.forEach(movie => {
                visitedMovies.push(movie.val());
            });
            setMostVisitedMovies(visitedMovies.reverse());
        });
        
        return () => {
            firebaseService.getMostLikedMovies(8).off("value");
            firebaseService.getMostVisitedMovies(8).off("value");
        }
    }, []);
    
    return (
        <div>
            <NavBar />
            <RenderMostLikedMovies/>
            <RenderMostVisitedMovies/>
        </div>
    );
}

export default Home;