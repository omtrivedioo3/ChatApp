import { useEffect, useState } from 'react'
import UseConversation from '../zustend/UseConverstion';
import toast from 'react-hot-toast';

const UseGetMessage = () => {
    const [loading,setloading] = useState(false);
    const {messages,setMessages,selectedConverstion}=UseConversation()

    useEffect(()=>{
        const getMessages = async () =>{
            setloading(true)
            try{
                const res= await fetch(`/api/messages/${selectedConverstion._id}`)
                const data = await res.json()
                if(data.success == false) throw new Error(data.message)
               // console.log("data in usegetmessage:",data);
                setMessages(data);
            }catch(e){
                toast.error(e.message);
            }finally{
                setloading(false)
            }
        }

        if(selectedConverstion?._id)getMessages();
    },[selectedConverstion?._id,setMessages])

    return {messages,loading}
}

export default UseGetMessage
