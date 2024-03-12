import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import UseSendMessage from "../../hooks/UseSendMessage";
function MessageInput() {
  const [message, setMessages] = useState("");
  const { loading, SendMessage } = UseSendMessage();

  const handlesubmit = async (e) => {
    e.preventDefault();
    //  console.log(message)

    if (!message) return;
    await SendMessage(message);
    setMessages("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handlesubmit}>
      <div className="w-full relative ">
        <input
          type="text"
          placeholder="send a message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-600 text-white"
          value={message}
          onChange={(e) => setMessages(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
