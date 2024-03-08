import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import UseConversation from '../../zustend/UseConverstion'
import { extractTime } from '../../utils/ExtractTime'

function Message({message1}) {
   const {authuser} = useAuthContext()
   const {selectedConverstion}=UseConversation()

  
  const formatedDate = extractTime(message1.createdAt || message1.newMessage.createdAt );
   const fromMe = ((message1.senderId || message1.newMessage.senderId) === authuser.data.id)
   
   const chatClassName = fromMe ? 'chat-end':'chat-start';
   const profilePic = fromMe ? authuser.data.profilepicture : selectedConverstion?.profilepic;
   const bgColor = fromMe ? 'bg-red-700' : '';
   const shakeClass = message1.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
        <img
				src={profilePic}
				alt='Tailwind CSS chat bubble component'
        />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bgColor} ${shakeClass
      }`}>
           {(message1.message || message1.newMessage.message)}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
           {formatedDate}
      </div>
    </div>
  )
}

export default Message
