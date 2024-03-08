import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokenAndSentCookies from "../utils/generateToken.js";

export const signup = async (req,res) =>{
    try{
        const{fullname,username,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword)
        {
            return res.status(400).json({
                message:"password dosn't match",
                success:false
            })
        }

        const user = await User.findOne({username});
        if(user)
        {
            return res.status(401).json({
                message:"username already exists",
                success:false
            })
        }

        //hash pass
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(password, salt);
        //pic api
        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password:hashpass,
            gender,
            profilepic:gender==="male"?boyprofilepic:girlprofilepic,
        })

        if(newUser)
        {
            // generate jwt token here
            generateTokenAndSentCookies(newUser._id,res);
            await newUser.save();

            res.status(200).json({
                message:'user created succesfully',
                data:newUser,
                success: true  
            })
        }
        else
        {
            res.status(404).json({
                message:'invalid user data',
                success: false
            })
        }

       
    }catch(err){
        console.log(err); 
        return res.status(403).json({
            message:"internal server error in signup",
            success:false
        })
    }
}

export const login = async (req,res) =>{  
    try{
        const {username,password} = req.body;
       // console.log("hello");
        const user = await User.findOne({username});
      //  console.log("1hello");
        const ispasscorrect = await bcrypt.compare(password,user?.password || "")

        if(!user || !ispasscorrect)
        {
            return res.status(406).json({
                message: "Invalid username or password",
                success: false
            })
        }
        generateTokenAndSentCookies(user._id,res);

        res.status(201).json({
            message:"user login succesfully",
            success:true,
            data:{
            id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilepicture:user.profilepic,
            }
        });
         


    }catch(e){
        console.log(e); 
        return res.status(405).json({
            message:"internal server error in login",
            success:false
        })
    }
}

export const logout = (req,res) =>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({
            message:"user logged out successfully",
            success:true
        })
    }catch(e){
        console.log(e); 
        return res.status(406).json({
            message:"internal server error in logout",
            success:false
        })
    }
} 

