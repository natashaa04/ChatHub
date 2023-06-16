import Conversation from "../models/ConversationSchema.js";



//get conversation and if doesn't exist create the one  
//it is normal function.....we are using it in messagge-controller in 
 export const getConversation=async(sender,reciever)=>{
try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });

    if (conversation) {
      // Conversation already exists
         return conversation._id;
    } else {
      // Conversation doesn't exist, create a new one
      const newConversation = new Conversation({
        members: [sender,reciever],
      });

      const savedConversation = await newConversation.save();
      return savedConversation._id;
    }
  } catch (err) {
    console.log(`error while getting or creatingg a conversation is ${err}`);
  }
};

//get all conversations of a particular user
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    })
      .sort({ updatedAt: -1 }) // Sort conversations by the time of the last message in descending order
      .exec();

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
};



//get users which are not in a conversation list of a user  for showing them in suggestions
export const getUsersWithoutConversations = async (req, res) => {
  try {
    const userConversations = await Conversation.find({
      members: { $in: [req.user._id] },
    });

    const conversationMembers = userConversations.reduce(
      (members, conversation) => members.concat(conversation.members),
      []
    );

    const usersWithoutConversations = await User.find({
      _id: { $nin: conversationMembers },
    
    });

    res.status(200).json(usersWithoutConversations);
  } catch (err) {
    res.status(500).json(err);
  }
};
