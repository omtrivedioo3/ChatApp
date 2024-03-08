import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

function UseLogout() {
    const [loading,setloading] = useState(false);
    const {setauthuser} = useAuthContext();

    const logout = async () =>{
        setloading(true);
        try{
            const res= await fetch("/api/auth/logout",{
                method:"POST",
                headers:{ "content-Type":"application/json"},
            });

            const data = await res.json();
            if(data.success == false){
                throw new Error(data.message);
            }

            localStorage.removeItem("chat-user");
            setauthuser(null);
        }catch(e){
            toast.error(e.message);
        }finally{
            setloading(false);
        }
    }
    return {loading,logout};
}

export default UseLogout
