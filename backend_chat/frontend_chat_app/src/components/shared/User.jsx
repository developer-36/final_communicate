/* eslint-disable no-unused-vars */
import { UseSocketContext } from "../../context/SocketContex.jsx";
import useConversation from "../../statemanager/useConversation.js";

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = UseSocketContext();

  const isSelected = selectedConversation?._id === user?._id;
  const isOnline = onlineUsers.includes(user?._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-4 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img
              src={user?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              alt={user?.name ? `${user.name}'s avatar` : "Default avatar"}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user?.name || "Unnamed User"}</h1>
          <span>{user?.email || "No Email Provided"}</span>
        </div>
      </div>
    </div>
  );
};



export default User;
