import User from "../models/user.js";

export const getUserSideBar = async (req,res) =>{
    try{
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(allUsers);

    }catch(err){
        console.log(err);
        res.status(404).json({
            message:"error in user fetch",
            success:false
        })
    }
}