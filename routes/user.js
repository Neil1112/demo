// package imports
const express = require('express');
const passport = require('passport');
const JWT = require('jsonwebtoken');

// local imports
const passportConfig = require('../config/passport');
const User = require('../models/User');


const userRouter = express.Router();


// utility function
const signToken = userID => {
    return JWT.sign({
        iss: "NeilDeveloper",
        sub: userID
    }, "NeilDeveloper", {expiresIn: "30day"});
}


// authenticate the user
userRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    if(req.isAuthenticated()) {     // isAuthenticated() is added by passport
        const {_id, username, role} = req.user;     // req.user is attached by passport to the requests
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {username, role}});
    } 
})

// logout the user
userRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('access_token');
    res.json({user: {username: "", role: ""}, success: true});
})




// persisting a user state after he closes the browser
userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {username, role} = req.user;
    console.log(req.user);
    res.status(200).json({isAuthenticated: true, user: {username, role}});
})

module.exports = userRouter;