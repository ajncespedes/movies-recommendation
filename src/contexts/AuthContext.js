import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../util/firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(username, password) {
        return auth.createUserWithEmailAndPassword(`${username}@example.com`, password);
    }

    function signin(username, password) {
        return auth.signInWithEmailAndPassword(`${username}@example.com`, password);
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsuscribe;
    }, []);
    

    const value = {
        currentUser,
        signin,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}
