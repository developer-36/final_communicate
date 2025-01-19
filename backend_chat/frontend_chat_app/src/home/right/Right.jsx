import { useEffect } from "react"
import useConversation from "../../statemanager/useConversation"
import Chatuser from "./Chatuser"
import Message from "./Message"
import Type from "./Type"



const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  
  return (
    <div className='w-[70%]  border-white bg-slate-900 text-white'>
      <div>
        {
          !selectedConversation ? (
            <>
            <NoChat />
            </>
          ) : (
            <>
              <Chatuser></Chatuser>
              <Message></Message>
              <Type></Type>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Right




const NoChat = () => {
  return(

    <>
    <div>
     <div className="flex text-white h-screen items-center justify-center">
       <h1 className="text-white text-center font-semibold">No conversation selected 
       Select a conversation to start a chat.
       </h1>
     </div>
    </div>
    </>
  )
}