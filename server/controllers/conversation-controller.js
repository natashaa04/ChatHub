import Conversation from "../models/ConversationSchema.js";



//get conversation and if doesn't exist create the one
 export const getConversation=async(req,res)=>{
try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });

    if (conversation) {
      // Conversation already exists
      res.status(200).json(conversation);
    } else {
      // Conversation doesn't exist, create a new one
      const newConversation = new Conversation({
        members: [req.params.firstUserId, req.params.secondUserId],
      });

      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


