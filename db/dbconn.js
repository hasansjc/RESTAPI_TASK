const config = require('config')

const port = config.get('DB.DB_PORT');
const host = config.get('DB.DB_HOST');

const mongoose = require ('mongoose');

mongoose.connect(`mongodb://${host}:${port}/test_restapi`)
    .then(()=>{
        console.log("db connected...");
    })
    .catch((err)=>{
        console.log(err);
    });


