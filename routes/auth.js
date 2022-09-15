const express = require('express');
const router = express.Router();
const authContorller =require('../Controllers/auth_controller');
const authMiddleware = require('../Config/auth_middleware');

//Create a USER using POST method, "/api/auth". Doesnot require acutal authentication. User does not need to be logged in for using this endpoint, this will be used later on when we use the authentication function.

//This code might seem very difficult but it is very simple, we have a route, middlewares and a controller function, all written at once, this is why it looks difficult. And for the syntax of express-validator just read the documentation of the same and it will seem very easy to you.
router.post('/', authMiddleware.home ,authContorller.home)

module.exports = router;