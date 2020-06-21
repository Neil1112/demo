const express = require('express');
const passport = require('passport');


// local imports
const passportConfig = require('../config/passport');
const User = require('../models/User');
const Client = require('../models/Client');
const Counselor = require('../models/Counselor');


const counselorRouter = express.Router();


// @route       - /counselor/profile - GET
// @description - to retrieve logged in counselor's profile
// @authorize   - PRIVATE - [counselor]
counselorRouter.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    Counselor.findOne({email: req.user.email}).populate('user').exec()
    .then(counselor => res.status(200).json({counselor, message: {msgBody: "Data retrieved successfully", msgError: false}}))
    .catch(err => res.status(500).json({message: {msgBody: "Error has occured", msgError: true}}));

})


module.exports = counselorRouter;