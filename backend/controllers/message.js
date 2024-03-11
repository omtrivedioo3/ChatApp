import Converstion from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId,io } from "../socket/Socket.js";

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
        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        res.status(201).json({
            newMessage
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


//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
export const createGroupChat = (async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Converstion.create({
      chatName: req.body.name,
      participants: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Converstion.findOne({ _id: groupChat._id })
      .populate("participants", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
export const renameGroup = (async (req, res) => {
    const { chatId, chatName } = req.body;
  
    const updatedChat = await Converstion.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("participants", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  });

  export const addToGroup = (async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await Converstion.findByIdAndUpdate(
      chatId,
      {
        $push: { participants: userId },
      },
      {
        new: true,
      }
    )
      .populate("participants", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  });