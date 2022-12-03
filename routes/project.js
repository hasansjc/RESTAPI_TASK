const express = require('express')
const router = express.Router();
const Project = require('../db/models/project')
const auth = require('../middlewares/auth')

router.post('/',(req,res)=>{
    console.log("project body",req.body);
    const {name, description} = req.body;
    const new_project = new Project({name,description})
    new_project.save(function (err, doc) {
        if(err) console.log(err);
        console.log(doc._id);
        res.status(200).send("Project registered successfully")
    });
})

router.get('/',auth, async(req,res)=>{
    try {
        const projectDetails = await Project.find();
        console.log(projectDetails);
        return res.status(200).send(projectDetails);
    } catch (error) {
        res.status(400).send("some error",error)
    }
    
})

module.exports = router