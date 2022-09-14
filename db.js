const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";

const connetToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo successfully");     //This line will connect to mongoURI and it returns a promise and once this connection is done succssfully it will trigger a call back function. This could also have been done with the help of async and await. Since connection to mongo could only be done in background since JS works on a non blocking nature.
    });
}


module.exports = connetToMongo; 