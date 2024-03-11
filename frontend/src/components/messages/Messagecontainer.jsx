import { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from 'react-icons/ti'
import { useAuthContext } from '../../context/AuthContext'
import UseConversation from '../../zustend/UseConverstion'
import { IoMailOpenSharp } from 'react-icons/io5'

function Messagecontainer() {
  const {selectedConverstion,setSelectedConverstion}=UseConversation()
  useEffect(()=>{
    return () => setSelectedConverstion(null)
  },[setSelectedConverstion])
  return (
    <div className='md:min-w-[700px] flex flex-col '>
      {!selectedConverstion?(<NoChatSelected/>):(
        <>
      <div className='bg-slate-500 px-4 py-2 mb-2'>
 		<span className='label-text'>To: </span> 
        <span className='text-gray-900 font-bold'>{selectedConverstion.fullname}</span>
	  </div>
      <Messages/>
      <MessageInput/>
      </>
      )}
    </div>
  )
}

export default Messagecontainer

const NoChatSelected = () => {
	const { authuser } = useAuthContext();
  //console.log("auth",authuser)
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authuser.data.fullname} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
