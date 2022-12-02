const express = require('express');
const app = express();
const config = require('config');
const user = require('./routes/user');
const project = require('./routes/project');
const task = require('./routes/tasks')
const auth = require('./routes/auth')
const port = process.env.PORT;

require('./db/dbconn');
app.use(express.json());
app.use('/user',user);
app.use('/project',project);
app.use('/task',task);
app.use('/auth',auth);

if(!(config.get('jwtPrivateKey'))){
    console.error("fatal error");
    process.exit(1)
}

app.listen(port,()=>{
    console.log('listening at port 8000');
})