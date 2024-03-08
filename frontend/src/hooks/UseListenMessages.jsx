import { useEffect } from "react";

import { useSocketContext } from "../context/SocketConext";
import UseConversation from "../zustend/UseConverstion";

import notificationSound from "../assets/sounds/frontend_src_assets_sounds_notification.mp3";

const UseListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = UseConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default UseListenMessages;