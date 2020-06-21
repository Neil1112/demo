import React, {useState, useContext} from 'react';

// local imports
import AuthService from '../../services/AuthService';
import {AuthContext} from '../../contexts/AuthContext';
import {ThemeContext} from '../../contexts/ThemeContext';


const Home = props => {

    // context
    const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);

    const logoutHandler = () => {
        AuthService.logout().then(data => {
            if(data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
                // props.history.push('/');
            } else {

            }
        })
    }

    
    const { theme } = useContext(ThemeContext);
    console.log(theme);

    return (
        <h1>
            Hello
            <button onClick={logoutHandler}>Logout</button>
        </h1>
    )

}

export default Home;