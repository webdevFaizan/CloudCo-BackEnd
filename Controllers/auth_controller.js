const { body, validationResult } = require('express-validator');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET='iamdev.faizan';       //Ideally this secret should be kept as an environment variable in the server side deployment, so that we could change it as we wish.

module.exports.createuser = async (req,res)=>{    //Since we are sending data from the client to server, which is being received by the server, the method should be post not get, since get method will send the req.body data in the url, and post will hide it somehow. This is useful for both sensitive information as well as information that are heavy, for sending in lots of data. Using POST method will not let the password logged using middleware. We do not want password to be saved anywhere.

    // This req.body consists of data that we receive from client side, and these data could be appropriate, for example the email could not be in the form of email etc. So we need to use an express validator so that we could keep a check and balance of different parameters.
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try{    
        let user = await User.findOne({email : req.body.email});        //Most of the db calls are usually promises, if we do not await then 'user' will have a undefined value.
        if(user){
            return res.status(400).send({success, error : "User already exists."})
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
        var authToken = jwt.sign(data, JWT_SECRET);     //Synchornous sign method, signing the token with data.
        //Here we would want to send the authentication token, this is provided by the server, so that it could be verified that the authentication is properly done.
        return res.status(200).json({success: true, authToken : authToken});    //IMPORTANT : This authToken is going to be sent to the client, allowing the client to access and have an authorization to access parts of website, and since the data is kept inside the authToken so the front end could use this token to read what payload is being transferred.
        // return res.status(200).json({});
    }
    catch(e){
        //Ideally this try catch block will not only throw an error or just simply tell the client about the error, but this catch block must log this error in some good format, so that developers know what exactly is the error.
        console.log(e.message)
        return res.status(400).json({error : "Intenal Server Error.", message : e.message});
        // If we do not send this res.send method here, then the server will wait for some time for this to be sent and finally it will be request timed out. So we must send it. Or else it might block other method call. Or server might be kept unnecessarily busy.
    }
        // We can now send req.body or we could now send in user. user is an instance of the object created in db, which req.body is the data that is being saved in db. Here .send() method takes only one object, if we put two objects in its arguments, then we will get an error.
}



//IMORTANT : At this point, ending of lecture 50, we are not using passport js, for any authentication of the user identity, we are using simply bcryptjs to check for the password stored in the data base, now when the authentication is complete, we will pass some unique data of the user in the jwt authentication token. And the best part about this jwt token is that, we will get this token only if the user it authenticated, i.e the user name and password is correct. But the main purpose of jwt token is to provide authorization and which part of website is accessible to me and which part is not, this is not being utilised right now. We will do that in future.
module.exports.login = async (req,res)=>{ 
    const errors = validationResult(req);
    console.log(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let success=false;

    let {email, password} = req.body;       //Destructuring and saving the email and password in separate variables.

    try{    
        let user = await User.findOne({email : req.body.email});     
        if(!user){
            return res.status(400).json({success,error : "Username/Password incorrect."});
        }

        // PARTIALLY IMPORTANT : This method takes a password from the client side, and also takes the hash stored db, to check if the password is correct or not, all the decipeher of the hash will be handled by bcrypt itself. We do not need to worry about the password check.
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success : false,error : "Username/Password incorrect."});
        }

        console.log(user);
        const data = {
            user_id : user._id
        }
        var authToken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({success: true, authToken : authToken});

    }
    catch(e){
        console.log(e.message)
        return res.status(400).json({success, error : "Intenal Server Error.", message : e.message});
    }
}


module.exports.getuser = async (req, res)=>{

    try {
        let user_id=req.user;       //Once the authentication using id is done (i.e jwt token is verified) then we will extract the payload of the user and then query the db.
        let user = await User.findById(user_id).select("-password");        //We will query all the items but not take password as it is even sensitive to send or receive the hashed password when it is not required.
        return res.status(200).json(user);      //Once authenticated then we will send in the details of the user, and the client will take this data and display it as if it is showing the custom data on the very same webpage. This is optimised, since the component of the front end will remain the same, it will be changed as per the api, that too only after login. Once logged in the details will remain the same.
    } catch (error) {
        console.log(error);
        return res.status(400).json({error : "Intenal Server Error.", message : error.message});        //In case of any server error, show this data. The react front end can have a '/400' route that will be mounted even if the internet connection is down, this could only be done using single page application, since the components are already downloaded and if the internet connection is down then it will mount this component. This gives a very good user experience, since website is never down. Powerful feature of SPA.
    }
}







