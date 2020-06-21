const express = require('express');
const passport = require('passport');


// local imports
const passportConfig = require('../config/passport');
const User = require('../models/User');
const Client = require('../models/Client');


const clientRouter = express.Router();


// @route       - /client/register - POST
// @description - to create a new client
// @authorize   - PUBLIC
clientRouter.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    User.findOne({email}, (err, user) => {
        // Error has occured
        if(err) res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});

        // User already exists
        if(user) res.status(400).json({message: {msgBody: "User already exist", msgError: true}});

        else {
            // Else create a new user
            const newUser = new User({username, email, password, role: "client"});
            newUser.save()
                .then(user => {
                    // Now create a new client
                    const newClient = new Client({user, email});
                    newClient.save()
                        .then(client => res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}}));

                })
                .catch(err => res.status(500).json({message: {msgBody: "Error has occured2", msgError: true}}));
        }
    })
})


// @route       - /client/profile - GET
// @description - retrieve currently logged in client's data
// @authorize   - PRIVATE - [client]
clientRouter.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    Client.findOne({email: req.user.email}).populate('user').exec()
        .then(client => res.status(200).json({client, message: {msgBody: "Data retrieved successfully", msgError: false}}))
        .catch(err => res.status(500).json({message: {msgBody: "Error has occured", msgError: true}}));
})


// @route       - /client/isCounselorAllocated - GET
// @description - check if there is a counselor allocated to the client
// @authorize   - PRIVATE - [client]
clientRouter.get('/isCounselorAllocated', passport.authenticate('jwt', {session: false}), (req, res) => {
    Client.findOne({email: req.user.email}).populate('allocatedCounselor.counselor').exec()
        .then(client => res.status(200).json({client, message: {msgBody: "Data retrieved successfully", msgError: false}}))
        .catch(err => res.status(500).json({message: {msgBody: "Error has occured", msgError: true}}));
})




module.exports = clientRouter;