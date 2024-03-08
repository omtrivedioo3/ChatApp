import { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import UseConversation from '../../zustend/UseConverstion';
import UseGetConverstion from '../../hooks/UseGetConverstion';
import toast from 'react-hot-toast';
function SearchInput() {
  const [search,setSearch] = useState("");
  const {setSelectedConverstion} = UseConversation();
  const {conversations1} = UseGetConverstion();

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!search)return;
    if(search.length < 1)
    {
      return toast.error("search term must be at least 3 characters long")
    }
    //console.log(conversations1)
    const conversation = conversations1.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));

    if(conversation)
    {
      setSelectedConverstion(conversation);
      setSearch("");
    }
    else toast.error("no such user found");
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type='text' placeholder='Search..' className='input input-bordered rounded-full' 
          value = {search}
          onChange={(e) =>setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-red-700 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput
