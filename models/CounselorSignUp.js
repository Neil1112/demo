const mongoose = require('mongoose');

const CounselorSignUpSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model('CounselorSignUp', CounselorSignUpSchema);