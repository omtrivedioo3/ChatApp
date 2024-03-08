import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function UseLogin() {
  const [loading,setloading] = useState(false);
    const {setauthuser} = useAuthContext()

  const login = async ({username,password}) =>{
    setloading(true)
    try{
        const res = await fetch("/api/auth/login",{
            method:"POST",
            headers:{ "content-Type":"application/json"},
            body:JSON.stringify({username,password})
        })

        const data= await res.json();
        if(data.success == false)
        {
            throw new Error(data.message);
        }

        localStorage.setItem("chat-user",JSON.stringify(data));
        setauthuser(data);

    }catch(e){
        toast.error(e.message);
    }finally{
        setloading(false);
    }
  }
  return {loading,login}
}

export default UseLogin
