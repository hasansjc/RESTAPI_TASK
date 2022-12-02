const mongoose = require('mongoose');
const {User}= require('./user');
const taskSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true
      },
    project : {
        type: String,
        required: true
      }, 
    task_name : {
        type: String,
        required: true
      }, 
    description : String, 
    starttime:{
        type:Date,
        default: Date.now
    },
    endtime:Date, 
    status :{
        type: String,
        enum: ['Completed','Pending',"In Progress","Blocked"]
      },
  });

module.exports = mongoose.model('Task', taskSchema); 