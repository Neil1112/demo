import React, {useState, useEffect, createContext} from 'react';

// local imports
import AuthService from '../services/AuthService';

// export the AuthContext
export const AuthContext = createContext();


// AuthContext Provider
export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated()
            .then(data => {
                setUser(data.user);
                setIsAuthenticated(data.isAuthenticated);
                setIsLoaded(true);
            });
    }, [])

    return (
        <div>
            {!isLoaded ? <h1>Loading...</h1> : 
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>
            }
        </div>

    )
}