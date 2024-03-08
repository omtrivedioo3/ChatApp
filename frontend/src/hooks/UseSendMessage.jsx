import React, { useState } from 'react'
import UseConversation from '../zustend/UseConverstion'
import toast from 'react-hot-toast';

const UseSendMessage = () => {
    const [loading,setloading] = useState(false)
    const {messages,setMessages,selectedConverstion}=UseConversation();

    const SendMessage = async (message) => {
        setloading(true)
        try{
            const res = await fetch(`api/messages/send/${selectedConverstion._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message})
            })

        const data = await res.json();
        if(data.success == false) {
            throw new Error(data.message);
        }
        console.log("sendmesss",data?.newMessage);
        setMessages([...messages,data?.newMessage]);
        }catch(e){
            toast.error(e.message);
        }finally{
            setloading(false);
        }
    }
    return {SendMessage,loading}
}

export default UseSendMessage
