const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');


//Create a USER using POST method, "/api/auth". Doesnot require acutal authentication. User does not need to be logged in for using this endpoint, this will be used later on when we use the authentication function.

//This code might seem very difficult but it is very simple, we have a route, middlewares and a controller function, all written at once, this is why it looks difficult. And for the syntax of express-validator just read the documentation of the same and it will seem very easy to you.
router.post('/', 
body('email').isEmail(),
body('password').isLength({ min: 5 }),
body('name').isLength({ min: 3 }),
async (req,res)=>{    //Since we are sending data from the client to server, which is being received by the server, the method should be post not get, since get method will send the req.body data in the url, and post will hide it somehow. This is useful for both sensitive information as well as information that are heavy, for sending in lots of data. Using POST method will not let the password logged using middleware. We do not want password to be saved anywhere.

    // This req.body consists of data that we receive from client side, and these data could be appropriate, for example the email could not be in the form of email etc. So we need to use an express validator so that we could keep a check and balance of different parameters.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        })
        res.status(200).send(req.body);
        // We can now send req.body or we could now send in user. user is an instance of the object created in db, which req.body is the data that is being saved in db. Here .send() method takes only one object, if we put two objects in its arguments, then we will get an error.
    }
    catch(e){
        console.log(e);
        res.send({"error":"Please enter a unique value of email.", message : e.message});
        // If we do not send this res.send method here, then the server will wait for some time for this to be sent and finally it will be request timed out. So we must send it. Or else it might block other method call. Or server might be kept unnecessarily busy.
    }
})

module.exports = router;