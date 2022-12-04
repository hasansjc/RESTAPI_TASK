const express = require('express');
const router = express.Router();
const {User,validateUser} = require('../db/models/user');
const _ = require('lodash');
const asyncErrHandler = require('../middlewares/asyncErrHandler')
const auth = require("../middlewares/auth")
// router.get('/:id',auth, async(req, res)=>{
    
//     let _id = req.params['id'];
//     try {
//         const userDetails = await User.findOne({_id});
//         if(!userDetails) return res.json({message:"User not found"})
//         console.log("user details of individual user",userDetails);
//         res.json(userDetails)
//     } catch (error) {
//         console.log(error);
//     }
    
// })
router.get('/me',auth, asyncErrHandler(async(req, res)=>{
    
        const userDetails = await User.findById(req.user._id);
        res.status(200).send(userDetails)
        return; 
}))

router.get('/',auth, asyncErrHandler(async(req, res)=>{
  
        const users = await User
        .find()
        .select("name email -_id");
        console.log("user details of individual user",users);
        res.json(users)
     
}))

router.post('/',asyncErrHandler(async(req,res)=>{
   
    const {error} = validateUser(req.body)
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }
    const {name, email,password, phone, projects} = req.body;
    
        var oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist");
          }
    const new_user = new User({name,email,password,phone,projects})
    
        const doc = await new_user.save();
        console.log(doc._id);
        res.status(200).send("User registered successfully")
   
}))

module.exports = router