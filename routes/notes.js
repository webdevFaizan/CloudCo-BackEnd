const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    let obj={
        content : "This is the notes page",
        title : "Notes page",
        author : 'Faizan'
    }
    res.send(obj);    
})

module.exports = router;
