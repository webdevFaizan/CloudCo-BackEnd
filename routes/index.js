const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    let obj={
        content : "This is the home page",
        title : "Home page",
        author : 'Faizan'
    }
    res.send(obj);   
});


module.exports = router;