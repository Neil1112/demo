const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: {type: String, required: true},
    age: {type: Number},
    gender: {type: String, enum: ['male', 'female']},
    phone: {type: String},
    clientForm: {type: Object},
    allocatedCounselor: {
        isTrue: {type: Boolean, default: false},
        counselor: {type: mongoose.Schema.Types.ObjectId, ref: 'Counselor'}
    },
    
    sessionList: {type: [mongoose.Schema.Types.ObjectId], ref: 'Session'},
    imgUrl: {type: String}
});

module.exports = mongoose.model('Client', ClientSchema);