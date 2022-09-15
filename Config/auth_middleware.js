const { body } = require('express-validator');


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


