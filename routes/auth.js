const express = require('express');
const router = express.Router();
const authContorller =require('../Controllers/auth_controller');
const authMiddleware = require('../Config/auth_middleware');

//Create a USER using POST method, "/api/auth/createuser". Doesnot require acutal authentication. User does not need to be logged in for using this endpoint, this will be used later on when we use the authentication function.
router.post('/createuser', authMiddleware.createuser ,authContorller.createuser);

//Authenticate a User using POST : '/api/auth/login'    No login required, any endpoint that is going to show some personal data is going to require a login.
router.post('/login', authMiddleware.login ,authContorller.login);

module.exports = router;