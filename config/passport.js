const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

// local imports
const User = require('../models/User');


//cookieExtractor Utility function
const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

// JWT Strategy - Authorization Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "NeilDeveloper"
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        // If error occured
        if(err) return done(err);

        // User founded
        if(user) return done(null, user);

        // Somehow user not found (Should not happen unless someone has your cookie. [Although he won't be able to access the API.])
        else return done(null, false);
    })
}))



// Local Strategy - Authentication Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    User.findOne({email}, (err, user) => {
        // Something went wrong with database
        if(err) return done(err);

        // No user exists
        if(!user) return done(null, false);

        // User founded
        user.comparePassword(password, done);

    })
}))