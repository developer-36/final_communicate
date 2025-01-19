const Messages = ({message}) => {
  const authUser = JSON.parse(localStorage.getItem("messanger"));
  const itsme = message.senderId === authUser.user._id;
  const chatName = itsme ? "chat-end" : "chat-start"
  const chatColor = itsme ? "bg-blue-400" : "";
  const createdAt = new Date(message.createdAt)
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
});
console.log(formattedTime);


  return (
    <div className="p-4">

<div className={`chat ${chatName} flex flex-col`}>
  <div className={`chat-bubble text-white ${chatColor}`}>{message.message}</div>
  <div className="text-sm">{formattedTime}</div>
</div>

    </div>
  )
}

export default Messages