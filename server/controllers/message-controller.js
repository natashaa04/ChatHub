import Message from "../models/MessageeSchema.js"
import Conversation from "../models/ConversationSchema.js"

//add new message
export const addMessage = async(req,res)=>{

    const newMessage = new Message(req.body);

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  
}

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
  