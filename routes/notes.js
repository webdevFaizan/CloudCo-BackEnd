const express = require('express');
const router = express.Router();
const authMiddleware = require('../Config/auth_middleware');
const notesMiddleware = require('../Config/notes_middleware');
const notesController = require('../Controllers/notes_controller');


// Route 1 : '/api/notes/fetchnotes'    Get all the notes of the user that is logged in.
//If we have /api/notes here, then the end point will become http://localhost:5000/api/notes/api/notes, this is why '/' is kept only, no other endpoints is kept.
router.get('/fetchnotes',authMiddleware.getuser, notesController.getNotes);
// Note - In this method, a middle ware is being called that is basically authenticating if the token being carried by req.header is valid or not. If it is valid then we will fetch the data of the current logged in user.


// Route 2 : '/api/notes/addnote'    using POST, and we need to be logged in for this -
router.post('/addnote',authMiddleware.getuser, notesMiddleware.checkNotes, notesController.addNote);


// Route 3 : '/api/notes/updatenote'    using POST, and we need to be logged in for this -

// You can use post request in the following funciton, but it is a good idea to use put method for this update request. IMPORTANT** You could use the same end point to do some other works as well, if the request is different, this is one of the main benefits. Plus anyone wathching this code, will automatically know that this request must be for updating. 
router.put('/updatenote/:id',authMiddleware.getuser, notesController.updateNote);
// Here we are going to use the req.param which will basically pass us the id of the note to be updated, now go to the controller function.





module.exports = router;
