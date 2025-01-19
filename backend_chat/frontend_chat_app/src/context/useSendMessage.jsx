import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import parseJwt from "../utility/jwt.js";
import useConversation from "../statemanager/useConversation.js";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages , setMessages, selectedConversation } = useConversation();

  // Define sendMessage outside useEffect
  const sendMessage = async (message) => {
    if (!selectedConversation || !selectedConversation._id) return; // Ensure a conversation is selected.
    try {
      setLoading(true); // Set loading state before async call.

      const token = Cookies.get("jwt_token");
      if (!token) throw new Error("No token found");

    //   const user = parseJwt(token); // Decodes the token payload.

      const response = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Add token in header.
          },
        }
      );
    const { newMessage } = response.data;
    const List = messages.message || [];

      const arrayObject = [...List, newMessage] 
      setMessages( { message: arrayObject});

    } catch (error) {
      console.error("Error in sendMessage:", error);
    } finally {
      setLoading(false); // Reset loading state after the operation.
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
