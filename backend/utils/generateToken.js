import jwt from 'jsonwebtoken';

const generateTokenAndSentCookies = (userId,res) =>{
      const token = jwt.sign({userId},"omtrivedi",{
        expiresIn:'15d'
      })

      res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true, //prevent croos-site scripting attacks
        sameSite: "strict",
        // secure:process.env.NODE_ENV !== "development"//cross-site request forgery attacks
      })
} 

export default generateTokenAndSentCookies; 