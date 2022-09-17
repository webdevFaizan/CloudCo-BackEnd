const e = require('express');
const { body } = require('express-validator');
var jwt = require('jsonwebtoken');

const JWT_SECRET='iamdev.faizan';


//This code might seem very difficult but it is very simple, we have a route, middlewares and a controller function, all written at once, this is why it looks difficult. And for the syntax of express-validator just read the documentation of the same and it will seem very easy to you.
module.exports.createuser = function(req,res,next){
    try{
        body(req.body.email,"Please enter the correct format of Email.").isEmail();
        body(req.body.password, "Mininum length of password must be 5.").isLength({ min: 5 });
        body(req.body.name, "Mininum length of name should be 3.").isLength({ min: 3 });
    }
    catch(e){
        console.log(e);
    }
    next();
}

module.exports.login = function(req,res,next){
    try{
        body(req.body.email).isEmail();     //Here this line simply means, if the email entered by user is not of correct syntax then we will not even bother requesting from the server, the client can deal with this.        
        // We are not adding any password length checks, since it might give a hint to the attacker about what is the structure of password. 
        body(req.body.password,"Password cannot be blank").exists();        //This is to check in case someone tries to login without a password.
    }
    catch(e){
        console.log(e);
    }
    next();
}

module.exports.getuser = async function(req, res, next){
    const token = req.header('authToken');     //Once the user is logged in, then the in the header it will send the jwt token created with the help of jwt_secret key and thus we will extract that information here and then extract the id of the user and then pass on this id to the next middleware to hit the database for our results.
    // console.log(token);
    if(!token){
        return res.status(401).json({error : "Please use a correct authorization token"});
    }
    try {
        const data =jwt.verify(token, JWT_SECRET);
        req.user = data.user_id;        //IMPORTANT This is the payload kept inside the jwt token, this is the main identity of the user, we can fetch this data and use it to get the details of the user from the db. In the next function.
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({error : error.message});
    }
}
