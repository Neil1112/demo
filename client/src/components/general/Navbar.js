import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';

// local imports
import AuthService from '../../services/AuthService';
import {AuthContext} from '../../contexts/AuthContext';

const Navbar = props => {

    // contexts
    const {isAuthenticated, user} = useContext(AuthContext);


    // functional component's return
    return (
        <nav className="navbar navbar-expand-lg">
            
        </nav>
    )

}

export default Navbar;