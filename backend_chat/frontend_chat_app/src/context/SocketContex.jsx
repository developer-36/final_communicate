import { createContext, useContext, useEffect, useState } from "react";
import {useAuth} from "./AuthProvider.jsx"
import io from "socket.io-client"

const socketContext = createContext();

export const UseSocketContext = () =>{
    return useContext(socketContext);
}

 const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])
    const [authUser] = useAuth()

    useEffect(()=>{
        if (authUser) {
            const socket = io("https://final-communicate.onrender.com/", {
                query:{
                    userId: authUser.userId,
                }
            });  
            setSocket(socket); 
            socket.on("getonline",(users) => {
                setOnlineUsers(users);
                console.log("socket disconnected");
            });
            return () => socket.close();
        }
        else{
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);

    return (
        <socketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </socketContext.Provider>
    )
}

export default SocketProvider

