const express = require('express');
const Users  = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let fetchuser = require('../middleware/fetchuser')
const { findOne } = require('../models/Users');


const JWT_SECRET = 'Harryisagoodb$oy';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
  
      // Create a new user
      user = await Users.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, JWT_SECRET);
  
      success = true
      // res.json(user)
      res.json({success, token })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
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
        let success = false
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
            const data = {
                user: {
                  id: user.id
                }
              }
            const token = jwt.sign(data, JWT_SECRET);
            // const token = jwt.sign({ userr:{id: user.id} }, 'ITsKEY');
            console.log("user._id inside login",user.id)
            success = true
            return res.status(200).json({success,token})
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
        console.log(user,"OOOOO",userId)
        if(!user){
            return res.status(401).send("User is not valid for")
        }
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal Server Error/")
    }
       
        
    })



module.exports = router

