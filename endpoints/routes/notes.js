const express = require('express')
const routes = express.Router()
const Notes = require("../models/Notes");
var fetchuser = require('../middleware/fetchuser')
routes.use(express.json());
const { body, validationResult } = require('express-validator');

// Routes:1 fetch the data from "/api/notes/fetchnotes"
routes.get('/fetchnotes', fetchuser , async(req,res)=> {
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
    
}) 

// Routes:2 to add new notes to notes "/api/notes/addnotes"
routes.post('/addnotes',fetchuser,[
    body('title','please enter the title').isEmpty(),
    body('description','please enter description').isLength({min:10})]
   ,async(req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        res.status(400).json({errors:errors.array()})
    }
    try{
        const {title,description,tag} =req.body
        const note = new Notes({
            title, description,tag,user: req.user.id})
        
        let saveData = await note.save()
        res.json(saveData);
    }

    catch(error){
        res.status(400).send(error)
    }
   })


//    Routes:3 update a existing note "api/notes/updatenote"

routes.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} =req.body
    // create a new note object
    const newnote = {};
    if(title){newnote.title = title}
    if(description){newnote.description = description}
    if(tag){newnote.tag = tag}
    let note = await Notes.findById(req.params.id) 
    if(!note){
        return res.status(400).send("not found")
    }
    if(note.user.toString() !==req.user.id){
        return res.status(400).send("not allowed")
    }
    const updateData = await Notes.findByIdAndUpdate(req.params.id,{$set : newnote},{new : true})
    res.json(updateData)
})

// Routes:4 To delete the exists notes "api/notes/deletenotes"
routes.delete('/deletenote/:id',fetchuser ,async(req,res)=>{
    // find the note id in db
    try{
        let note = await Notes.findById(req.params.id) 
        if(!note){
            return res.status(400).send("not found")
        }
        // find the user is the correct
        if(note.user.toString() !==req.user.id){
            return res.status(400).send("not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"succes": "notes has been deleted" ,note:note})
}catch(err){
    res.send(err)
}
}) 
module.exports = routes;