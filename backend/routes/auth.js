const express = require('express');
const Users  = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let fetchuser = require('../middleware/fetchuser')
const { findOne } = require('../models/Users');

//Route1: create a new user: POST /api/auth/createuser: no loging required
router.post('/createuser',
    [
        body('name').isLength({ min: 3 }),
        body('email',"Email should be correct!").isEmail(),
        body('password').isLength({ min: 5 }),
    ],
    async(req,res)=>{
    //for validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    console.log((req.body))
    //check if user email already exist in DB.
    let users = await Users.findOne({email: req.body.email})
    if(users){
        return res.status(400).json({error:"User with same email id is already exist."})
    }
    //generating hash code for security purpose.
    const salt = await bcrypt.genSaltSync(10);
    req.body.password = await bcrypt.hashSync(req.body.password, salt);

    //for saving data into database
    try{
        users = await Users.create(req.body)
        //generating token using JWT
        const token = jwt.sign({ user:{id: users.id} }, 'ITsKEY');
        res.status(200).json({token})
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})


//Route2: Authenticate a user: POST /api/auth/login: no loging required
router.post('/login',
    [
        // body('name').isLength({ min: 3 }),
        body('email',"Email should be correct!").isEmail(),
        body('password',"Password cannt be empty").isLength({ min: 1 }),
    ],
    async(req,res)=>{
        console.log("inside login")
        //for validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const {email,password} = req.body
        try{
  
            const user = await Users.findOne({email})
            if(!user){
                return res.status(400).json({msg:"Please enter correct credentials."})
            }

            const hashPass = await bcrypt.compare(password, user.password)
            if(!hashPass){
                return res.status(400).json({msg:"Please enter correct credentials."})
            }
            //generating token using JWT
            const token = jwt.sign({ user:{id: user.id} }, 'ITsKEY');
            return res.status(200).json({token})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

    })


//Route3: Authenticate a user: POST /api/auth/getuser: Loging required
router.post('/getuser', fetchuser,  async(req,res)=>{
    try {
        let userId  = req.user.id
        const user = await Users.findById(userId).select("-password")//fins using id and fetch all data except password
        console.log(user,"OOOOO")
        if(!user){
            return res.status(401).send("User is not valid for")
        }
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal Server Error/")
    }
       
        
    })



module.exports = router

