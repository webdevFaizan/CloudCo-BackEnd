const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
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

const User = mongoose.model('user', UserSchema);
User.createIndexes();       //Adding this line will require a unique key, which means if same email is entered by 2 users for signup it will reject.
module.exports = User;