import Message from "../models/MessageeSchema.js"
import Conversation from "../models/ConversationSchema.js"
import { getConversation } from "./conversation-controller.js";



//add new message
export const addMessage = async (req, res) => {
  const { sender, text, receiver } = req.body;

  const conversationId = getConversation(sender, receiver);

  const newMessage = new Message({
    conversationId,
    sender,
    text,
  });

  try {
    const savedMessage = await newMessage.save();

    // Update the conversation's updatedAt field so that we can access conversation according to time 
    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json({ savedMessage, conversation });
  } catch (err) {
    res.status(500).json(err);
  }
};




//get all messages of a particular conversation
export const getMessage = async (req, res) => {
    try {
      const page = req.query.page || 1; // Get the page number from the query parameters
      const limit = 15; // Number of messages to retrieve per page
      const skip = (page - 1) * limit; // Calculate the number of messages to skip
  
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      })
        .sort({ createdAt: -1 }) // Sort messages in descending order of creation time
        .skip(skip) // Skip the specified number of messages
        .limit(limit); // Limit the number of messages returned
  
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  