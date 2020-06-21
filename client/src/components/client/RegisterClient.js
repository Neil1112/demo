import React, {useState, useRef, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';

// local imports
import {ThemeContext} from '../../contexts/ThemeContext';
import AuthService from '../../services/AuthService';
import Message from '../general/Message';

const RegisterClient = props => {

    // contexts
    const { theme, colors, fontFamily, fontSize, fontWeight } = useContext(ThemeContext);

    // states
    const [user, setUser] = useState({username: "", email: "", password: "", confirmPassword: ""});
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
        if(user.password === user.confirmPassword) {
            AuthService.registerClient(user).then(data => {
                const { message } = data;
                setMessage(message);

                resetForm();
                if(!message.msgError) {
                    timerID = setTimeout(() => {
                        props.history.push('/user/login');
                    }, 1500)
                }
            })
        } else {
            setMessage({
                msgBody: "Passwords don't match",
                msgError: true
            })
        }
    }


    // function's return
    return (
        <div className="p-3 col-md-4 mt-5 mb-5 offset-md-4" style={theme.form}>
            <form onSubmit={handleSubmit} style={{paddingLeft: "10%", paddingRight: "10%"}}>
                <h2 style={theme.heading}>Register an account</h2>
                <br />

                {message ? <Message message={message} /> : null}

                <label htmlFor="username" style={theme.formBodyText} >Name </label>
                <input type="text" 
                       name="username"
                       value={user.username} 
                       onChange={handleChange} 
                       className="form-control"
                       required
                       style={theme.formInput} 
                       />
                <br />

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

                
                <label htmlFor="confirmPassword" style={theme.formBodyText} >Confirm Password </label>
                <input type="password" 
                       name="confirmPassword"
                       value={user.confirmPassword}  
                       onChange={handleChange}
                       className="form-control"
                       required 
                       style={theme.formInput}
                       />
                <br />

                <button className="btn mt-2" 
                        type="submit"
                        style={theme.formSubmit}>Register</button>

                <p style={{fontFamily: fontFamily.primary, fontSize: fontSize.sm, marginTop: "10px"}}>
                    Already have an account?
                    <Link to="/user/login">
                        <span style={{color: colors.primaryGreenDark, fontWeight: fontWeight.bold}}> Login here</span>
                    </Link>
                </p>
            </form>

            
        </div>
    )


}

export default RegisterClient;