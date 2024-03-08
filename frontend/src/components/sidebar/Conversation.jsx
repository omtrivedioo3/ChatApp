import React from 'react'
import UseConversation from '../../zustend/UseConverstion'
import { useSocketContext } from '../../context/SocketConext';

function Conversation({conversation,lastIdx,emoji}) {
  const {selectedConverstion,setSelectedConverstion}=UseConversation()

  const isSelected = selectedConverstion?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  //console.log("hello",conversation);
  return (
    <div>
      <div className={`flex gap-2 items-center hover:bg-red-700 rounded p-2 py-1 cursor-pointer
                      ${isSelected?"bg-red-700":""}
                      `}
          onClick={()=>setSelectedConverstion(conversation)}            
        >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className='w-12 rounded-full'>
            <img
				src={conversation.profilepic}
				alt='user avatar'
                />
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{conversation.fullname}</p>
                <span className='text-xl'>{emoji}</span>
            </div>
        </div>
      </div>
     {!lastIdx && <div className='divider py-0 my-0 h-1'/>}

    </div>
  )
}

export default Conversation
