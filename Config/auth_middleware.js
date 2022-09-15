const { body } = require('express-validator');


module.exports.home = function(req,res,next){
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

