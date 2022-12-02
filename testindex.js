const express = require('express')
const app = express();

app.get('/:id',(req,res)=>{
    
    res.json(({message:"Hello World",params :req.params}))
});

app.listen(3000,()=>{
    console.log("listening at port 3000");
})