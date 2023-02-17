const express = require('express');
const Users  = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//create a user add end[point]: POST /api/auth
// router.post('/', async (req,resp)=>{
//     console.log(req.body,"post")
//     const users = Users(req.body)
//     await users.save()
//     resp.send(req.body)
// })
//END POINT: POST /api/auth/createuser
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
    let user = await Users.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error:"User with same email id is already exist."})
    }
    //generating hash code for security purpose.
    const salt = await bcrypt.genSaltSync(10);
    req.body.password = await bcrypt.hashSync(req.body.password, salt);

    //for saving data into database
    try{
        users = await Users.create(req.body)
        res.status(200).json(users)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

router.get('/',async(req,res)=>{
    console.log((req.body))
    try{
        const users = await Users.create(req.body)
        res.status(200).json(users)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

// router.get('/',async (req, resp)=>{
//     console.log(req.body)
//     const users = Users(req.body)
//     await users.save()
//     console.log("inside POST")

//     resp.send(req.body)

// })

module.exports = router



