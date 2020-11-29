import React from 'react';
import { Link, useHistory  } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import UserDropdown from './UserDropdown';
import { OMDB_API_KEY, OMDB_URL } from '../util/Constants';

const NavBar = () => {
    const history = useHistory();

    const getOptions = (query) => {
        return new Promise((resolve, reject) => {
            fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${query}&type=movie`)
                .then(response => response.json())
                .then(({ Search }) => {
                    resolve(Search.map(({ imdbID, Title, Poster }) => ({ value: imdbID, name: Title, image: Poster })))
                })
                .catch(reject);
        });
    }

    const renderMovieOption = (props, option, snapshot, className) => {
        const imgStyle = {
            verticalAlign: 'middle',
            marginRight: 10,
            borderRadius: 5,
        };
        
        return (
            <button {...props} className={className} type="button">
                { option.image === "N/A" ?
                    <span><img alt="" style={imgStyle} width="60" height="100" src="/images/no-image.png" /><span>{option.name}</span></span> :
                    <span><img alt="" style={imgStyle} width="60" height="100" src={option.image} /><span>{option.name}</span></span>
                }
            </button>
        );
    }

    const onChange = (imdbID) => {
        history.push(`/detail/${imdbID}`);
    }

    return (
        <div>
            <nav className="navbar is-fixed-top is-black pl-5 pr-6" role="navigation" aria-label="main navigation">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">
                            <img src="/images/palomitas-de-maiz.svg" alt="Home" width="30px" height="30px" /> &nbsp; Movies Recommendation
                        </Link>
                    </div>
                    <div className="navbar-end">
                        <div className="mt-2">
                            <SelectSearch
                                options = {[]}
                                getOptions = {getOptions}
                                search
                                placeholder="Movie to search..."
                                onChange = {onChange}
                                renderOption={renderMovieOption}
                            />
                        </div>
                        <div className="mt-1">
                            <UserDropdown />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;