import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function UseSingUp() {
   const [loading,setloading] = useState(false);
   const {authuser,setauthuser}=useAuthContext()


   const signup =async({fullname,username,password,confirmPassword,gender}) =>{
    //console.log(fullname+username+password+confirmPassword+gender);
        const success = handleInputErrors({fullname,username,password,confirmPassword,gender})
        if(!success)return;

        setloading(true);
        try{
            const res = await fetch("/api/auth/singup",{
                method:"POST",
                headers:{ "content-Type":"application/json"},
                body:JSON.stringify({fullname,username,password,confirmPassword,gender})
            })

            const data =await res.json();
            console.log(data);
            if(data.success === false)
            {
                throw new Error(data.message);
            }

            //local-storage
            localStorage.setItem("chat-user",JSON.stringify(data));
            setauthuser(data);

        }catch(e){
            toast.error(error.message)
        }finally{
            setloading(false);
        }
   }
   return {loading,signup};
}

export default UseSingUp

function handleInputErrors({fullname,username,password,confirmPassword,gender}){
    if(!gender || !fullname || !username || !password || !confirmPassword)
    {
        toast.error("please fill all the fields")
        return false;
    }

    if(password !== confirmPassword)
    {
        toast.error("password don't match")
        return false;
    }

    if(password.length <6)
    {
        toast.error("password must be at least 6 characters")
        return false;
    }
    return true;
}
