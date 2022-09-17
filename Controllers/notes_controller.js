const express = require('express');
const Notes = require('../Models/Notes');
const { body, validationResult } = require('express-validator');


module.exports.getNotes = async (req, res) =>{
    try{
        console.log(req.user);
        const notes = await Notes.find({user : req.user}).populate('user');     //I am populating this, since I want all the users personal detail, I want to add it to the note card, so that I could look the author of the post, when it was created and when it is modified.
        // console.log(notes);
        return res.status(200).send(notes);
    }
    catch(error){
        return res.status(500).send("internal server error.");
    }
}


module.exports.addNote = async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if(!req.user){
        return res.status(400).json({error : "please login first"});
    }

    try{
        let note = await Notes.create({
            user : req.user,
            title : req.body.title,
            description : req.body.description,
            tag : req.body.tag
        });

        if(!note){
            return res.status(400).send("some error occured while create notes");
        }
        // const jsonNote = await note.json();
        const notes = await Notes.find({user : req.user}).populate('user');
        return res.status(200).json(notes);
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json("Internal server error occured while creating notes and sending to db");
    }
}


module.exports.updateNote = async function (req,res){
    try{
        let  {title, description, tag} =req.body;
        let note = await Notes.findById(req.params.id);       //This params.id we will get from the routes, since it was present in routes as /:id. Now only req.query is left, we have not implemented it yet. But request.params and request.params are completely different things.
        if(!note){
            return res.status(404).send("notes not found")
        }
        // console.log("Old note is : "+ note);
        let newNote ={} ;
        if(title){ newNote.title = title}       //Only update those elements that are being updated.
        if(description){ newNote.description = description}
        if(tag){ newNote.tag = tag}
        // console.log("Note to be updated is : ");
        // console.log(newNote);   //I had to separate these two console.log line, since in one single line this was giving us [object, object] tag, this is because it is kind of being converted to string but we want to keep it like a json object.
        

        
        //IMPORTANT : note.user.toString() is same as note.user._id.toString() The reason for this is simple, We have populated the user of every note so that I could display the name of the user, but populating does not mean we cannot access the user directly. We can do that by just adding _id to it.
        if(note.user.toString()!==req.user){        //DOUBT : If the user has been populated, then what will this function note.user.toString() return? Ideally it should return the string id of the user. Or else we could still access the id of the user. notes.user.id just think that the user has been populated then .id will be available inside the object.
            console.log("You are trying to update a note you are not authorized to update.");
            return res.status(401).send("Not authorized to update");
        }

        // IMPORTANT : Why did we not choose to find the note and update above, why calling findOne first time, and then findbyidandupdate the second time. This is to ensure our api is secure to all threats physical or magical. In the findOne we just checked if the notes existed on db or not? if yes then do not update it as soon as possible, update it only when you are having some more checks, What if the first user is logged in then the middleware will give an auth token but what if the first user is trying to change the note of a second user. This is why the above if conidtion is mentioned. The problem is if you do not keep these check on the back end side, then any hacker could manupulate our front end and make it look like a correct user is editing a correct document. But if our api is strong then this possiblitiy is gone. 

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});      //I read the documentation, and explained in brief about this method here, in the .docs file.
        console.log("Updated note is : "+ note);

        res.status(200).send(note);
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({error : error.message});
    }

}





module.exports.deleteNote = async function (req,res){
    try{
        // console.log(req.params.id);
        let note = await Notes.findById(req.params.id);     
        if(!note){
            return res.status(404).send("notes not found")
        }
        console.log("Old note is : "+ note);
        
        if(note.user.toString()!==req.user){        //DOUBT : If the user has been populated, then what will this function note.user.toString() return? Ideally it should return the string id of the user. Or else we could still access the id of the user. notes.user.id just think that the user has been populated then .id will be available inside the object.
            console.log("You are trying to delete a note you are not authorized to delete.");
            return res.status(401).send("Not authorized to update");
        }

        note = await Notes.findByIdAndDelete(req.params.id);      //I read the documentation, and explained in brief about this method here, in the .docs file.

        return res.status(200).json({"message" : "Note is deleted"});
        // note= null;
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({error : error.message});
    }

}