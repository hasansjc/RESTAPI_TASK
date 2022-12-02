const mongoose = require('mongoose')
const tasks = require('./tasks');
const user = requre('./user')

const logSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : user,
        required : true
    },
    tasks:{
        type : mongoose.Schema.Types.ObjectId,
        ref : tasks,
        required : true
    }
})

module.exports = mongoose.model('Log',logSchema); 