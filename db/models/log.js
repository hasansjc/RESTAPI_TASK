const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const tasks = require('./tasks')
const user = require('./user')
const logSchema = new Schema({
    created_by : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    assigned_to : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    task: String,
    starttime: Date,
    endtime: Date, 
    hours : Date 
});

module.exports = mongoose.model('log', logSchema); 