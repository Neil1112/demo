const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// local imports
const db = require('./config/keys').mongoURI;

// import models
const User = require('./models/User');
const Client = require('./models/Client');

// import routers
const userRouter = require('./routes/user');
const clientRouter = require('./routes/client');
const counselorRouter = require('./routes/counselor');
// const generalRouter = require('./routes/general');
const adminRouter = require('./routes/admin');

const app = express();


// middlewares
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json());

// connecting to mongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// routes
app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/counselor', counselorRouter);
// app.use('/general', generalRouter);
app.use('/admin', adminRouter);



// starting a server
app.listen(5000, () => console.log('Server started at port 5000'));