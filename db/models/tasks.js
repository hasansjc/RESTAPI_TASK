const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    user : {
        type: String,
        required: true
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
    starttime:Date,
    endtime:Date, 
    status :{
        type: String,
        enum: ['Completed','Pending',"In Progress","Blocked"]
      },
  });

module.exports = mongoose.model('tasks', taskSchema); 