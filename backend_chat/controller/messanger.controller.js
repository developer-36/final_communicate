import Conversation from "../model/conversation.model.js";
import Message from "../model/messanger.model.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Current logged-in user

        console.log("find one: ", message);
        console.log({ id: receiverId });
        console.log("senderId ====>", senderId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        const receiverSocketId= getReceiverSocketId(receiverId);
        console.log("receiverSocketId ===>",receiverSocketId)
        console.log("receiverId ===>", receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error("Error in sending message", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessage = async(req, res) => {
    try {
        const {id: chatUser} = req.params;
        console.log("reqparams --->",req.params);
        
        const senderId = req.user._id;
        console.log("senderId =====> ",senderId);
        
        const conversation = await Conversation.findOne({
            participants: {$all : [senderId, chatUser]},
        }).populate("messages");
        // console.log("conversation ==== >",conversation.messages);
        
        if (!conversation) {
            return res.status(201).json([]);
        }
        const message =  conversation.messages;
        
        res.status(201).json({message});
    } catch (error) {
        console.log("Message getting error", + error);
        res.status(500).json({error: "internal server error"})
        
    }
}
