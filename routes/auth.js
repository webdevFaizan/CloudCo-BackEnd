const express = require('express');
const router = express.Router();
const authContorller =require('../Controllers/auth_controller');
const authMiddleware = require('../Config/auth_middleware');

//Create a USER using POST method, "/api/auth". Doesnot require acutal authentication. User does not need to be logged in for using this endpoint, this will be used later on when we use the authentication function.

router.post('/createuser', authMiddleware.createuser ,authContorller.createuser);

module.exports = router;