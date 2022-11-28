const express = require('express');
const app = express();
const user = require('./db/models/user');
const log = require('./db/models/log')
const tasks = require('./db/models/tasks')
const project = require('./db/models/project')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const auth = require('./auth')
dotenv.config();

const port = process.env.PORT;
// const logs = require('./db/models/tasks')
require('./db/dbconn');
app.use(express.json());
app.get('/',(req, res)=>{
    res.send("Hello")
    console.log("Hello");
})

app.get('/getuser/:user',auth, async(req, res)=>{
    
    let username = req.params['user'];
    console.log(username);
    const userDetails = await user.findOne({name:username});
    console.log("user details of individual user",userDetails);
    res.json(userDetails)
})

app.get('/gettasks',(req, res)=>{
    res.send("Hello")
    console.log("Hello");
})

app.post('/registeruser',async(req,res)=>{
    try {
        console.log("data",req.body);
    const {name, email,password, phone, projects} = req.body;
    const new_user = new user({name,email,password,phone,projects })
    const oldUser = await user.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist");
    }
        new_user.save(function (err, doc) {
            if(err) {
                console.log(err);
                res.send("Please enter valid user details");
            }
            console.log(doc._id);
            res.status(200).send("User registered successfully")
        });  
    } catch (error) {
        console.log(error);
    }
    
})

app.post('/login',async(req,res)=>{
    
    const {email, password} = req.body;
    console.log(email, password);
    const islogin = await user.findOne({email:email});
    console.log("user details",islogin);
    if(islogin){
        if(password == islogin.password){
            const token = jwt.sign(
                { user_id: islogin._id, email },
                process.env.JWT_SECRET_KEY,
                {
                  expiresIn: "2h",
                }
              );  
              console.log('token==========>',token);
              islogin.token = token;
              res.status(201).json(islogin);
        }
    }   
    
})

app.post('/createtask',(req,res)=>{
    console.log("data",req.body);
    const {user, project, task_name, description, starttime, endtime, status} = req.body;
    const new_task = new tasks({user, project, task_name, description, starttime, endtime, status })
 
        new_task.save(function (err, doc) {
            if(err) {
                console.log(err);
                res.send("Please enter valid user details");
            }
            console.log(doc._id);
            res.status(200).send("Task created successfully")
        });
   
    
    
})
async function storelogs(){
    const new_log = new log()
}
app.post('/createproject',(req,res)=>{
    console.log("project body",req.body);
    const {name, description} = req.body;
    const new_project = new project({name,description})
    new_project.save(function (err, doc) {
        if(err) console.log(err);
        console.log(doc._id);
        res.status(200).send("Project registered successfully")
    });
    
})

app.listen(port,()=>{
    console.log('listening at port 8000');
})