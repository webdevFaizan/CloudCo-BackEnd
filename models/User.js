const mongoose = require('mongoose');
const UserSchema = new mongoose.schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
},{
    timestamps: true
});
module.exports = mongoose.model('user', UserSchema);