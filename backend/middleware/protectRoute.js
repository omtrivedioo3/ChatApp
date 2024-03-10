import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token)
        {
            return res.status(401).json({
                message: 'Unauthorised user',
                success: false
            })
        }

        const decode = jwt.verify(token,"omtrivedi");
        if(!decode)
        {
            return res.status(401).json({
                message: 'Unauthorised-invalid token',
                success: false
            })
        }

        const user = await User.findById(decode.userId).select("-password");

        req.user = user;
        next();

    }catch(err){
        console.error(err);
        return res.status(500).json({
            message:"error in protectroute middleware",
            success: false
        })
    }
}

export default protectRoute;  