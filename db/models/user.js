const mongoose = require('mongoose');
const validator = require('validator');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

  name:  {
    type: String,
    required: [true, "Name is a required field"],
    minlength: 5,
    maxlength : 50
  },

  email: {
    type: String,
    required: [true, "Email is a required field"],
    lowercase: true,
    minlength: 5,
    maxlength : 100,
    unique:true,
    validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid E-mail!");
        }
    }
  },

  password: {
    type: String,
    required: [true, "Password is a required field"],
    maxlength:1024,
    minlength:5
  },

  phone: {
    type: String,
    required: false
  },
 
});
function validateUser(req){
    const Schema = Joi.object({
        name : Joi.string().min(3).required(),
        email : Joi.string().email().min(3).required(),
        password:Joi.string().min(3).required(),
        phone:Joi.string().min(3).required(),
        projects:Joi.array().min(1).required(),
    })
    return Schema.validate(req);
}

userSchema.methods.generateAuthToken = function (){
      const secretkey = config.get('jwtPrivateKey')
      const token = jwt.sign({ _id: this._id, },secretkey);  
      console.log('token==========>',token);
      return token
}
module.exports.User = mongoose.model('User', userSchema);
module.exports.validateUser = validateUser; 