import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/authroutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageroute.js";

import { app,server } from './socket/Socket.js';
import connectDatabase from './db/connectdb.js';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes); 
app.use("/api/users",userRoutes); 

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

// app.get('/', (req, res) => {
//     res.send("hello world")
// })




server.listen(PORT,()=> {
    connectDatabase(); 
    console.log(`server running on port ${PORT}`)
})