const { body } = require('express-validator');

module.exports.checkNotes = function (req, res, next){
    
    
    body(req.body.title, "Mininum length of title should be 5.").isLength({ min: 5 });
    body(req.body.description, "Content too short").isLength({ min: 20 });
    body(req.body.tag, "Please select a proper category of your notes.").isLength({ min: 3 });
    next();
}