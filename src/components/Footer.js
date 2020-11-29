import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p className="is-pulled-left">Powered by <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDB</a> and <a href="https://tastedive.com/read/api" target="_blank" rel="noopener noreferrer">TasteDive</a> APIs</p>
            <a className="is-pulled-right" href="https://www.linkedin.com/in/ajncespedes/" target="_blank" rel="noopener noreferrer"><i className="fa fa-lg fa-fw fa-linkedin"></i></a>
            <a className="is-pulled-right" href="https://github.com/ajncespedes" target="_blank" rel="noopener noreferrer"><i className="fa fa-lg fa-fw fa-github"></i></a>
            <p className="is-pulled-right  mr-3">Developed by <b>ajncespedes</b></p>
            <br/>
            <br/>
        </footer>
    );
};

export default Footer;