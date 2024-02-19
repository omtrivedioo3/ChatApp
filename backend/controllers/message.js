import Converstion from "../models/conversation.js";
import Message from "../models/message.js";

export const sendMessage  = async (req,res)=>{
    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let converstion = await Converstion.findOne({
            participants:{ $all : [senderId,receiverId] },
        })

        if(!converstion) {
            converstion = await Converstion.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage)
        {
            converstion.messages.push(newMessage._id);
        }
        //socket io function
        // await converstion.save();
        // await newMessage.save();

        await Promise.all([converstion.save(),newMessage.save()]);

        res.status(201).json({
            newMessage,
            success: true, 
        })

    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"error in message controller",
            success:false
        })
    }
}

export const getMessage = async (req, res) =>{
    try{
        const {id:userToChatId}= req.params;
        const senderId = req.user._id;

        const converstion = await Converstion.findOne({
            participants:{ $all:[senderId,userToChatId]},
        }).populate("messages");

        if(!converstion)return res.status(200).json([])

        res.status(200).json(converstion.messages)
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"error in get message controller",
            success:false
        })
    }
}