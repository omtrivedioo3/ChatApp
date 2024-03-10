import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect db successfully");
         
    }catch(e){
        console.log("error from dbconnection:"+e.message);
    }
}

export default connectDatabase;