import mongoose from "mongoose";

const converstionSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
  
},{timestamps:true});

const Converstion = mongoose.model("Converstion",converstionSchema);
export default Converstion;