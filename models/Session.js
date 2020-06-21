const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    counselor: {type: mongoose.Schema.Types.ObjectId, ref: 'Counselor'},
    time: {type: Date},
    date: {type: Date},
    modeOfServiceSelected: {type: String, enum: ['call', 'chat', 'video']},
    amountPaid: {type: Number},
    transaction: {type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'},
    status: {type: Boolean}
});

module.exports = mongoose.model('Session', SessionSchema);