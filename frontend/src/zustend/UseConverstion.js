import {create} from 'zustand';

const UseConversation = create((set)=>({
    selectedConverstion: null,
    setSelectedConverstion : (selectedConverstion) => set({selectedConverstion}),
    messages:[],
    setMessages:(messages) => set({messages}),
}));

export default UseConversation;