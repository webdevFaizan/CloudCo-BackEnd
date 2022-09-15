const { body, validationResult } = require('express-validator');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET='iamdev.faizan';       //Ideally this secret should be kept as an environment variable in the server side deployment, so that we could change it as we wish.

module.exports.createuser = async (req,res)=>{    //Since we are sending data from the client to server, which is being received by the server, the method should be post not get, since get method will send the req.body data in the url, and post will hide it somehow. This is useful for both sensitive information as well as information that are heavy, for sending in lots of data. Using POST method will not let the password logged using middleware. We do not want password to be saved anywhere.

    // This req.body consists of data that we receive from client side, and these data could be appropriate, for example the email could not be in the form of email etc. So we need to use an express validator so that we could keep a check and balance of different parameters.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{    
        let user = await User.findOne({email : req.body.email});        //Most of the db calls are usually promises, if we do not await then 'user' will have a undefined value.
        if(user){
            return res.status(400).send({error : "User already exists."})
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const secPass = bcrypt.hashSync(req.body.password, salt);

           user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPass
        })
        console.log(user);

        const data = {
            user_id : user._id          //IMPORTANT : Note this data is used to create the authentication token using the jwt.sign() method, but the data to be used should be user._id, since _id is an index in the database, and the retrieval of the data will be very fast using id. Also if you see the gui of monogodb, we can notice that email is also being treated as email, so we try to use the same email as sign up this will not be allowed since email should be unique also because it is used as an index.
        }
        var authToken = jwt.sign(data, 'shhhhh');     //Synchornous sign method, signing the token with data.
        return res.status(200).json({authentication_token : authToken});    //IMPORTANT : This authToken is going to be sent to the client, allowing the client to access and have an authorization to access parts of website, and since the data is kept inside the authToken so the front end could use this token to read what payload is being transferred.


        // return res.status(200).json({});
        //Here we would want to send the authentication token, this is provided by the server, so that it could be verified that the authentication is properly done.
    }
    catch(e){
        //Ideally this try catch block will not only throw an error or just simply tell the client about the error, but this catch block must log this error in some good format, so that developers know what exactly is the error.
        console.log(e.message)
        return res.status(400).json({error : "some error occured.", message : e.message});
    }
        // We can now send req.body or we could now send in user. user is an instance of the object created in db, which req.body is the data that is being saved in db. Here .send() method takes only one object, if we put two objects in its arguments, then we will get an error.
        
        // res.send({"error":"Please enter a unique value of email.", message : e.message});
        // If we do not send this res.send method here, then the server will wait for some time for this to be sent and finally it will be request timed out. So we must send it. Or else it might block other method call. Or server might be kept unnecessarily busy.
}