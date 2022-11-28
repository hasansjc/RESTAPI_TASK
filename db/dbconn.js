const port = process.env.DB_PORT;
const host = process.env.DB_HOST;

const mongoose = require ('mongoose');

async function dbconnect(){
    const conn = await mongoose.connect(`mongodb://${host}:${port}/test_restapi`);
if(conn){
    console.log("db connected...");
}
}
dbconnect();

