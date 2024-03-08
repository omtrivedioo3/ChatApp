import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/authroutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageroute.js";

import { app,server } from './socket/Socket.js';
import connectDatabase from './db/connectdb.js';

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes); 
app.use("/api/users",userRoutes); 

// app.get('/', (req, res) => {
//     res.send("hello world")
// })




server.listen(PORT,()=> {
    connectDatabase(); 
    console.log(`server running on port ${PORT}`)
})