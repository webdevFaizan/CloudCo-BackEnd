const { body } = require('express-validator');


//This code might seem very difficult but it is very simple, we have a route, middlewares and a controller function, all written at once, this is why it looks difficult. And for the syntax of express-validator just read the documentation of the same and it will seem very easy to you.
module.exports.createuser = function(req,res,next){
    try{
        body(req.body.email).isEmail();
        body(req.body.password).isLength({ min: 5 });
        body(req.body.name).isLength({ min: 3 });
    }
    catch(e){
        console.log(e);
    }
    next();
}

