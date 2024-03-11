import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Converstion" },
    message:{
        type:"string",
        required:true 
    }
    //careated,updated message
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema);
export default Message; 