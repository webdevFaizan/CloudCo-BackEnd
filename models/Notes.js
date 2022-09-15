const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user :{
        type:  mongoose.Schema.Types.ObjectId,      //This is like a reference of the user, if you are from SQL, you could understand this by considering it as a foreign key. And it is not being populated right now, it only keeps a reference of this object, but when you populate user, then only it will be shown, basically the all user details will be shown if you populates this field.
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps : true
});

module.exports = mongoose.model('notes', NotesSchema);