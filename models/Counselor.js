const mongoose = require('mongoose');

const CounselorSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: {type: String, required: true},
    age: {type: Number},
    gender: {type: String, enum: ['male', 'female']},
    modeOfService: {
        call: {
            isTrue: {type: Boolean, default: false},
            rate: {type: Number}
        },
        chat: {
            isTrue: {type: Boolean, default: false},
            rate: {type: Number}
        },
        video: {
            isTrue: {type: Boolean, default: false},
            rate: {type: Number}
        },
    },

    description: {type: String},
    degrees: {type: [String]},
    availableTime: {
        from: {type: Date},
        to: {type: Date}
    },

    totalMoneyEarned: {type: Number},
    pendingPayment: {type: Number},
    clientList: {type: [mongoose.Schema.Types.ObjectId], ref: 'Client'},
    sessionList: {type: [mongoose.Schema.Types.ObjectId], ref: 'Session'},
    imgUrl: {type: String}
});

module.exports = mongoose.model('Counselor', CounselorSchema);