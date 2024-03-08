import React from 'react'
import UseGetConverstion from '../../hooks/UseGetConverstion'
import { getRandomEmoji } from '../../utils/Emojis';
import Conversation from './Conversation';

const  Conversations=()=> {
   const {loading,conversations1}=UseGetConverstion();
   
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations1.map((conversation,idx)=>{
        //console.log(conversation),
        return <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx ={idx === conversations1.length -1}
        />
        
      })}
      {loading?<span className='loading loading-spinner'></span>:null}
    </div>
  )
}

export default Conversations;
