import Messages from './Messages.jsx'
import useGetMessage from '../../context/useGetMessage.jsx'
import Loading from '../../components/shared/Loading.jsx'
import { useEffect, useRef } from 'react';
import UseGetSocketMessage from '../../context/UseGetSocketMessage.jsx';
const Message = () => {
  const {messages  , loading } = useGetMessage();
  const messageList = messages.message || []; // Use an empty array if `messages.message` is undefined
  UseGetSocketMessage();
  const lastMessageRef = useRef();
  useEffect(()=>{
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({behavior: "smooth"})
      }
    }, 100);
  }, [messages])

  return (
    <>
    <div className='h-[calc(88vh-10vh)] overflow-y-scroll no-scrollbar'>
      
    {loading?(<Loading></Loading>):(messageList.length > 0 && messages.message.map((message)=>{
      return <div key={message._id} ref={lastMessageRef}><Messages   message={message}/></div>
    }))}
        {!loading && messageList.length === 0 && <div><p className='text-center font-sans mt-[20%]'> Say! Hi! </p></div>} 
</div>
    
      
    </>
  )
}

export default Message