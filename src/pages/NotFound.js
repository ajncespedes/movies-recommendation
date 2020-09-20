import React from 'react';
import ButtonBackToHome from '../components/ButtonBackToHome';

const NotFound = () => {
    return (
        <div className="has-text-centered">
            <p className="title is-1">404</p>
            <p className="subtitle is-3">Sorry! Page not found</p>
            <ButtonBackToHome />
        </div>
    );
};

export default NotFound;