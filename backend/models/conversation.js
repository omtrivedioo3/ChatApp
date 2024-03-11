import mongoose from "mongoose";

const converstionSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
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
    ],
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},{timestamps:true});

const Converstion = mongoose.model("Converstion",converstionSchema);
export default Converstion;