import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser' ;
import familyRouter from './routes/familyRoutes.js';
import dotenv from 'dotenv';
import uploadRouter from './routes/uploadRouter.js'
dotenv.config();
// const io = require('socket.io')(5000)



const app = express();
app.use(bodyParser.json())









mongoose.connect("mongodb+srv://ashar1:ashar1@cluster0.ybb8j.mongodb.net/amazonaDB?retryWrites=true&w=majority" , {
        useNewUrlParser : true ,
        useCreateIndex : true ,
        useUnifiedTopology : true } , 
        ()=>{console.log("connected to the DB")}
)



 
 
app.use('/api/uploads', uploadRouter);
app.use('/api/users', familyRouter);





const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
 

