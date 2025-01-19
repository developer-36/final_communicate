import { UseSocketContext } from "../../context/SocketContex.jsx";
import useConversation from "../../statemanager/useConversation.js"
const Chatuser = () => {
  const {selectedConversation} = useConversation();
    const{ onlineUsers} = UseSocketContext();
    const userId = selectedConversation._id;
    
    // const getOnlineUserStatus = (userId)=>{
    //   return onlineUsers.includes(userId)?"online":"offline"
    // }

    const isOnline = onlineUsers.includes(userId)
  return (
  <div className="p-3 h-[12vh] flex space-x-2 bg-gray-800 hover:bg-gray-600 duration-300">

    <div className={`${isOnline?"avatar online":""}`}>
    <div className="w-14">
      <img className="rounded-full" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>

  <div>
    <h1 className="text-xl">{selectedConversation?.name}</h1>
    <span className="text-sm">{isOnline?"Online":"Offline"}</span>
  </div>
  </div>
  )
}

export default Chatuser