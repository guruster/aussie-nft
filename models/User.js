const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    avatar: {
        type: String
      },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    nftIds: [
        {
            type: Number
        }
    ],
    ////    guest, admin
    role: {
        type: String,
        require: true,
        default: 'guest'
    }
});

module.exports = mongoose.model('user', UserSchema);
