import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Signin = () => {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const { signin, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    
    const onSubmit = async e => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await signin(usernameRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch(e) {
            setError(e.message);
        }
        setLoading(false);
    };

    return (
        <section className="is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                            {error && 
                                <div className="notification is-danger">
                                    {error}
                                </div>
                            }
                            <form onSubmit={e => onSubmit(e)} className="box">
                                <div className="field">
                                <label htmlFor="" className="label">Username {currentUser && currentUser.email}</label>
                                    <div className="control">
                                        <input type="text" placeholder="e.g. ajncespedes" className="input" ref={usernameRef} required></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="" className="label">Password</label>
                                    <div className="control">
                                        <input type="password" placeholder="*******" className="input" ref={passwordRef} required></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <button disabled={loading} className="button is-success">
                                        Sign In
                                    </button>
                                </div>
                                <div>
                                    Need an account? <Link to="/signup">Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signin;