const express = require('express')
const router = express.Router();
const Joi = require('joi');
const {User} = require('../db/models/user');
router.post('/',async(req,res)=>{
    
    const {error} = validate(req.body);

    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    const {email, password} = req.body;
    console.log(email, password);
    const userexist = await User.findOne({email:email});
    if(!userexist) return res.status(400).send("Invalid username or password")
    console.log("user details",userexist);

        if(password != userexist.password){
            return res.status(400).send("Invalid username or password")
        }
        const token = userexist.generateAuthToken();
          res.status(201).header('x-access-token',token).json(userexist);
    
})
function validate(req){
    const Schema = Joi.object({
        email : Joi.string().email().min(3).required(),
        password:Joi.string().min(3).required(), 
    })
    return Schema.validate(req);
}
module.exports = router;