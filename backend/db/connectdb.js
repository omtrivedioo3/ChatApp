import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = async () =>{
    try{
        await mongoose.connect("mongodb+srv://omtrivedioo3:URS1km3rfT2GeRxI@cluster0.be8vzog.mongodb.net/?retryWrites=true&w=majority");
        console.log("connect db successfully");
         
    }catch(e){
        console.log("error from dbconnection:"+e.message);
    }
}

export default connectDatabase;