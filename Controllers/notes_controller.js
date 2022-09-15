const express = require('express');
const Notes = require('../Models/Notes');
const { body, validationResult } = require('express-validator');


module.exports.getNotes = async (req, res) =>{
    try{
    const notes = await Notes.find({user : req.user});
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
        })
        if(!note){
            return res.status(400).send("some error occured while create notes");
        }
        return res.status(200).send("Notes successfully updates in the db");
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json("Internal server error occured while creating notes and sending to db");
    }


}
