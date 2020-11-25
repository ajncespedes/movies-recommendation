import React, {useState} from 'react';
import { Link, useHistory  } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import { OMDB_API_KEY, OMDB_URL } from '../util/Constants';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
    const [logoutError, setLogoutError] = useState('');
    const { currentUser, logout } = useAuth();

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


    const renderLogout = () => {
        const logoutStyle = {
            marginLeft: 30,
            cursor: 'pointer',
        };
        
        return (
            <a href onClick={onLogout} style={logoutStyle}>
                { currentUser ? 'Logout' : 'Login'}
            </a>
        );
    }

    const onChange = (imdbID) => {
        history.push(`/detail/${imdbID}`);
    }

    const onLogout = async () => {
        try{
            await logout();
            history.push('/signin');
        } catch(e) {
            setLogoutError(e.message);
        }
        
    }

    return (
        <div>
            <nav className="navbar is-fixed-top is-black pl-5 pr-6" role="navigation" aria-label="main navigation">
                <div className="navbar-menu pt-2">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">
                            <img src="/images/palomitas-de-maiz.svg" alt="Home" width="30px" height="30px" /> &nbsp; Movies Recommendation
                        </Link>
                    </div>
                    <div className="navbar-end">
                        <SelectSearch
                            options = {[]}
                            getOptions = {getOptions}
                            search
                            placeholder="Movie to search..."
                            onChange = {onChange}
                            renderOption={renderMovieOption}
                        />
                        {renderLogout()}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;