import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function UseGetConverstion() {
  const [loading,setloading] = useState(false);
  const [conversations1,setConversations] = useState([]);

  useEffect(()=>{
    const GetConversations = async () =>{
        setloading(true);
        try{
            const res = await fetch('/api/users');
            const data = await res.json();
            if(data.success == false)
            {
                throw new Error(data.message);
            }
           //// console.log("usdata",data);
            setConversations(data);

        }catch(e){
            toast.error(e.message);
        }finally{
            setloading(false);
        }
    }
    GetConversations();
  },[])
  return {loading,conversations1};
}

export default UseGetConverstion
