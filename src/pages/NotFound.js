import React from 'react';
import ButtonBackToHome from '../components/ButtonBackToHome';

const NotFound = () => {
    return (
        <div className="has-text-centered">
            <h1 className="title is-1">404</h1>
            <h2 className="subtitle is-3">Sorry! Page not found</h2>
            <ButtonBackToHome />
        </div>
    );
};

export default NotFound;