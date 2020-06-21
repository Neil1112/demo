const express = require('express');
const passport = require('passport');


// local imports
const passportConfig = require('../config/passport');
const User = require('../models/User');
const Client = require('../models/Client');
const Counselor = require('../models/Counselor');


const adminRouter = express.Router();


// Register a counselor
adminRouter.post('/registerCounselor',  (req, res) => {
    const { username, email, password } = req.body;

    User.findOne({email}, (err, user) => {
        // Error has occured
        if(err) res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});

        // User already exists
        if(user) res.status(400).json({message: {msgBody: "User already exist", msgError: true}});

        else {
            // Else create a new user
            const newUser = new User({username, email, password, role: "counselor"});
            newUser.save()
                .then(user => {
                    // Now create a new counselor
                    const newCounselor = new Counselor({user, email, age: 50});
                    newCounselor.save()
                        .then(counselor => res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}}));

                })
                .catch(err => res.status(500).json({message: {msgBody: "Error has occured", msgError: true}}));
        }
    })
})


module.exports = adminRouter;