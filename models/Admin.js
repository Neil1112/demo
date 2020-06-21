const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: {type: String, required: true},
    clientList: {type: [mongoose.Schema.Types.ObjectId], ref: 'Client'},
    counselorList: {type: [mongoose.Schema.Types.ObjectId], ref: 'Counselor'},
    sessionList: {type: [mongoose.Schema.Types.ObjectId], ref: 'Session'},
    contactUsList: {type: [mongoose.Schema.Types.ObjectId], ref: 'ContactUs'},
    counselorJoiningRequestList: {type: [mongoose.Schema.Types.ObjectId], ref: 'CounselorSignUp'}
});

module.exports = mongoose.model('Admin', AdminSchema);