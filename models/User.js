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
// User.createIndexes();       //Adding this line will require a unique key, which means if same email is entered by 2 users for signup it will reject. But we can have this check in the controller funciton, if the email already exists then we will send bad request.
module.exports = User;