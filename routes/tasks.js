const express = require('express');
const router = express.Router();
const Task = require('../db/models/tasks');

router.post('/',(req,res)=>{
    console.log("data",req.body);
    const {user, project, task_name, description, starttime, endtime, status} = req.body;
    const new_task = new Task({user, project, task_name, description, starttime, endtime, status })
 
        new_task.save(function (err, doc) {
            if(err) {
                console.log(err);
                res.send("Please enter valid user details");
            }
            console.log(doc._id);
            res.status(200).send("Task created successfully")
        });   
});

router.get('/',async(req, res)=>{
    try {
        console.log("called get");
        const tasks = await Task.find().populate('user','name -_id') // user is a property in mongoose schema
        console.log("tasks",tasks);
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router