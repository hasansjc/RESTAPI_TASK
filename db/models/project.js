const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    name:  {
        type: String,
        required: true
      },
    description : String
  });

  module.exports = mongoose.model('project', projectSchema); 
  