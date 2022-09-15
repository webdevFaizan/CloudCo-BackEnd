const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true        //Since this has been marked as unique, this means in the mongodb automatically this will be treated as an index. So even if you do not have any checks regarding the uniqueness of email, if you try to sign up using same mail, an automatic error is going to be thrown.
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