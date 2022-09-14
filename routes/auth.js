const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.get('/', async (req,res)=>{    
    try{
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        })
        res.send(req.body);    
    }
    catch(e){
        console.log(e);
    }
})

module.exports = router;