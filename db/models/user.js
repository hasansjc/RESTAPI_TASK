const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator')

const userSchema = new Schema({
  name:  {
    type: String,
    required: [true, "Name is a required field"],
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    lowercase: true,
    validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid E-mail!");
        }
    }
  },
  password: {
    type: String,
    required: [true, "Password is a required field"],
    validate(value) {
      if (!validator.isLength(value, { min: 6, max: 1000 })) {
        throw Error("Length of the password should be between 6-1000");
      }
    },
  },
  phone: {
    type: String,
    required: true
  },
  projects: [String]
});

module.exports = mongoose.model('user', userSchema); 