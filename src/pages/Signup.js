import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';


const Signup = () => {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    
    const onSubmit = async e => {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(usernameRef.current.value, passwordRef.current.value);
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
                                    <button className="delete"></button>
                                    {error}
                                </div>
                            }
                            <form onSubmit={e => onSubmit(e)} className="box">
                                <div className="field">
                                    <label htmlFor="" className="label">Username</label>
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
                                    <label htmlFor="" className="label">Password Confirmation</label>
                                    <div className="control">
                                        <input type="password" placeholder="*******" className="input" ref={passwordConfirmRef} required></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <button disabled={loading} className="button is-success">
                                        Sign Up
                                    </button>
                                </div>
                                <div>
                                    Already have an account? <Link to="/signin">Sign In</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;