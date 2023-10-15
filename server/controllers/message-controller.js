import Message from "../models/MessageeSchema.js"
import User from "../models/UserSchema.js";
import Conversation from "../models/ConversationSchema.js"
import { getConversation } from "./conversation-controller.js";
import { ObjectId } from "mongoose";


export const addMessage = async (req, res) => {
  const messageData = req.body;

  const conversationId = await getConversation(messageData.sender, messageData.reciever);

  const newMessage = await new Message({
    conversationId: conversationId,
    sender: messageData.sender,
    text: messageData.text,
    createdAt: messageData.createdAt,
  });

  try {
    const savedMessage = await newMessage.save();

    // Update the conversation's updatedAt field so that we can access conversation according to time
    const conversation = await Conversation.findByIdAndUpdate(
      messageData.conversationId,
      { updatedAt: messageData.createdAt },
      { new: true }
    );

    // Update the sender's "last message" and "last message time" in the conversationUser array
    await User.updateOne(
      { _id: messageData.sender, 'conversationUser.userId': messageData.reciever },
      {
        $set: {
          'conversationUser.$.lastMessage': messageData.text,
          'conversationUser.$.lastMessageTime': messageData.createdAt,
        },
      }
    );

    // Check if the receiver has the sender in their conversationUser array
    const receiver = await User.findOne({ _id: messageData.reciever });

    if (receiver) {
      const existingUserIndex = receiver.conversationUser.findIndex(userObj => userObj.userId.equals(messageData.sender));

      if (existingUserIndex !== -1) {
        // Update the receiver's "last message" and "last message time"
        receiver.conversationUser[existingUserIndex].lastMessage = messageData.text;
        receiver.conversationUser[existingUserIndex].lastMessageTime = messageData.createdAt;
        receiver.markModified('conversationUser');
      } else {
        // Add the sender to the receiver's conversationUser array
        receiver.conversationUser.push({
          userId: messageData.sender,
          lastMessageTime: messageData.createdAt,
          conversationId: conversationId,
        });
      }
      await receiver.save();

      // Sort the conversationUser array of the receiver
      receiver.conversationUser.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
      receiver.markModified('conversationUser');
      await receiver.save();
    }

    // Sort the conversationUser array of the sender
    const sender = await User.findOne({ _id: messageData.sender });
    sender.conversationUser.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    sender.markModified('conversationUser');
    await sender.save();

    res.status(200).json({ savedMessage, conversation });
  } catch (err) {
    console.log('add message error is', err);
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
  