const express = require('express');
const router = express.Router();
let fetchuser = require('../middleware/fetchuser')
let Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


//Route1: get all users notes: GET /api/notes/fetchallnotes: Loging required
router.get('/fetchallnotes', fetchuser,  async(req,res)=>{
    try {
        let userId  = req.user.id
        const notes = await Notes.find({user:req.user.id})
        console.log(userId,req.user.id,"IDDD", notes)

        res.json(notes)
    } catch (error) {
        res.status(500).send("Internal Server Error",error.message)
    }
       
        
    })

//Route2:add  notes: POST /api/notes/addnote: Loging required
router.post('/addnote', fetchuser,[
    body('title',"Title must be more than 2 char").isLength({ min: 3 }),
    body('description',"Description should be more than 4 charecter").isLength({ min: 5 }),
],
  async(req,res)=>{
    //for validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title, description, tag} = req.body
        const note = new Notes({
            title, description, tag,user:req.user.id 
        })
        const savedNote = await note.save()
        res.status(200).json(savedNote)



    } catch (error) {
        res.status(500).send("Internal Server Error",error.message)
    }
       
        
    })

//Route3:update  notes: POST /api/notes/updatenote: Loging required
router.put('/updatenote/:id', fetchuser,[
    body('title',"Title must be more than 2 char").isLength({ min: 3 }),
    body('description',"Description should be more than 4 charecter").isLength({ min: 5 }),
],
  async(req,res)=>{
    //for validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title, description, tag} = req.body
        let data = {}
        if(title){data.title = title}
        if(description){data.description = description}
        if(tag){data.tag = tag}

        //first check the this id is exist or not
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("Page not found")}

        //now time to check user is correct or not
        if(note.user.toString() !== req.user.id){ return res.status(401).send("Not allowd")}

        //now every thing varified so lets update
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: data}, {new:true})
        res.send(note)

    } catch (error) {
        res.status(500).send("Internal Server Error",error.message)
    }   
    })


//Route4:delete  notes: DELETE /api/notes/deletenote: Loging required
router.delete('/deletenote/:id', fetchuser, async(req,res)=>{
   
    try {
       
        //first check the this id is exist or not
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("Page not found")}

        //now time to check user is correct or not
        if(note.user.toString() !== req.user.id){ return res.status(401).send("Not allowd")}

        //now every thing varified so lets update
        note = await Notes.findByIdAndDelete(req.params.id)
        res.status(200).json({Success:"Note delete successfully", note})

    } catch (error) {
        res.status(500).send("Internal Server Error",error.message)
    }   
    })


module.exports = router



