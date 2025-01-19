/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Cookies from "js-cookie"
import parseJwt from '../utility/jwt.js';
import useConversation from '../statemanager/useConversation.js';

const useGetMessage = () => {
   const [loading, setLoading] = useState(false);
   const {messages, setMessages, selectedConversation} = useConversation();

   useEffect(()=>{
    const getMessage =  async() => {
        setLoading(true);
        if (selectedConversation && selectedConversation._id) {
        
        try {
            const token = Cookies.get("jwt_token");
            if (token) {
              const user = parseJwt(token); // Decodes the payload
              console.log(user); // Outputs the decoded payload
            //  return;
            
            const response = await axios.get(`/api/message/get/${selectedConversation._id}`, {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${token}`, // Ensure space between Bearer and token
                },
              });
            setMessages(response.data);
            setLoading(false);
            }
        } catch (error) {
            console.log("Error in useGetMessage: ", error); 
        }
    }
}
getMessage();
   }, [selectedConversation, setMessages])

  return {
      messages, loading
  }
}

export default useGetMessage