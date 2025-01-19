import {useEffect} from 'react'
import { UseSocketContext } from './SocketContex.jsx'
import useConversation from "../statemanager/useConversation.js";
import sound from "../assets/notify.mp3";

const UseGetSocketMessage = () => {
    const { socket } = UseSocketContext();
    const { messages, setMessages } = useConversation();

    const List = messages.message || [];


    useEffect(() => {
      socket.on("newMessage", (newMessage) => {
        const notification = new Audio(sound);
        notification.play();
        setMessages({message : [...List, newMessage]});

      });
    
      return () => {
        console.log("newmessages woek doenekk===")

        socket.off("newMessage")
      }
    }, [socket, messages, setMessages]);
    
}

export default UseGetSocketMessage