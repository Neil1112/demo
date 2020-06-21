import React, {useState, useRef, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';

// local imports
import {AuthContext} from '../../contexts/AuthContext'
import {ThemeContext} from '../../contexts/ThemeContext';
import AuthService from '../../services/AuthService';
import Message from './Message';

const Login = props => {

    // contexts
    const authContext = useContext(AuthContext);
    const { theme, colors, fontFamily, fontSize, fontWeight } = useContext(ThemeContext);

    // states
    const [user, setUser] = useState({email: "", password: ""});
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID)
        }
    }, [])

    // Utility functions
    // reset form 
    const resetForm = () => {
        // setUser({username: "", email: "", password: "", confirmPassword: ""});
    }

    // handle functions
    const handleChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const {isAuthenticated, user, message} = data;
            if(isAuthenticated) {
                setMessage(message);
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);

                if(user.role === "client") {
                    props.history.push('/client/dashboard');
                }
                else if(user.role === "counselor") {
                    props.history.push('/counselor/dashboard');
                }
                else {
                    props.history.push('/admin/dashboard');
                }

            } else {
                setMessage(message);
            }

            
        })
    }


    // function's return
    return (
        <div className="p-3 col-md-4 mt-5 mb-5 offset-md-4" style={theme.form}>
            <form onSubmit={handleSubmit} style={{paddingLeft: "10%", paddingRight: "10%"}}>
                <h2 style={theme.heading}>Login to your account</h2>
                <br />

                {message ? <Message message={message} /> : null}

                <label htmlFor="email" style={theme.formBodyText} >Email </label>
                <input type="text" 
                       name="email"
                       value={user.email} 
                       onChange={handleChange} 
                       className="form-control"
                       required 
                       style={theme.formInput}
                       />
                <br />

                <label htmlFor="password" style={theme.formBodyText} >Password </label>
                <input type="password" 
                       name="password"
                       value={user.password}  
                       onChange={handleChange}
                       className="form-control"
                       required 
                       style={theme.formInput}
                       />
                <br />

                

                <button className="btn mt-2" 
                        type="submit"
                        style={theme.formSubmit}>Login</button>

                <p style={{fontFamily: fontFamily.primary, fontSize: fontSize.sm, marginTop: "10px"}}>
                    Don't have an account?
                    <Link to="/client/register">
                        <span style={{color: colors.primaryGreenDark, fontWeight: fontWeight.bold}}> Register here</span>
                    </Link>
                </p>
            </form>

            
        </div>
    )


}

export default Login;