import Message from "../models/MessageeSchema.js"
import User from "../models/UserSchema.js";
import Conversation from "../models/ConversationSchema.js"
import { getConversation } from "./conversation-controller.js";
import { ObjectId } from "mongoose";


//add new message
export const addMessage = async (req, res) => {
  const messageData = req.body;

   const conversationId =await getConversation(messageData.sender,messageData.reciever);

   const newMessage = await new Message({
   conversationId:conversationId,
   sender: messageData.sender,
   text: messageData.text,
  });
console.log('new message is', newMessage);
  try {
    const savedMessage = await newMessage.save();

    // Update the conversation's updatedAt field so that we can access conversation according to time 
    const conversation = await Conversation.findByIdAndUpdate(
      messageData.conversationId,
      { updatedAt: Date.now() },
      { new: true }
    );
    const chatUser = await User.findByIdAndUpdate(
      messageData.reciever,
      { updatedAt: Date.now(),
        lastMessage: messageData.text, 
       },
      { new: true }
    );
    const me = await User.findByIdAndUpdate(
      messageData.sender,
      { updatedAt: Date.now(),
          lastMessage: messageData.text, 
       },
      { new: true }
    );
    console.log('conversation is',conversation);

    res.status(200).json({ savedMessage, conversation });
  } catch (err) {
    console.log('add message error is',err)
    res.status(500).json(err);
  }
};




//get all messages of a particular conversation
export const getMessages = async (req, res) => {
    try {
      const conversationId = await getConversation(req.params.user1,req.params.user2);
      console.log(`conversation id is jj ${conversationId}`)
     const page = req.params.page ? parseInt(req.params.page) : 1; // Get the page number from the query parameters
      const limit = 15; // Number of messages to retrieve per page
      const skip = (page - 1) * limit; // Calculate the number of messages to skip
  
      let messages = await Message.find({
        conversationId: conversationId,
      })
        .sort({ createdAt: -1 }) // Sort messages in descending order of creation time
        .skip(skip) // Skip the specified number of messages
        .limit(limit); // Limit the number of messages returned
        const reversedMessages = messages.reverse();
        messages=reversedMessages;
         console.log('messages are',messages,page);
      res.status(200).json(messages);
    } catch (err) {
      console.log('getMessage request error is',err);
      res.status(500).json(err);
    }
  };
  