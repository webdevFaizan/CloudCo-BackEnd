const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{        //If we have /api/notes here, then the end point will become http://localhost:5000/api/notes/api/notes, this is why '/' is kept only, no other endpoints is kept.
    let obj={
        content : "This is the notes page",
        title : "Notes page",
        author : 'Faizan'
    }
    res.send(obj);    
})

module.exports = router;
