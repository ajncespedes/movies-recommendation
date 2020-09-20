import React from 'react';

const Spinner = () => {
    return (
        <div className="has-text-centered">
            <div className="lds-dual-ring"></div>
            <p className="title is-3">Loading...</p>
        </div>
    );
}

export default Spinner;