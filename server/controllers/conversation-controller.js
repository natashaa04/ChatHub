import Conversation from "../models/ConversationSchema.js";



//get conversation and if doesn't exist create the one  
//it is normal function.....we are using it in message-controller in 
 export const getConversation=async(user1,user2)=>{
try {
  console.log('conversation user',user1,user2)
    const conversation = await Conversation.findOne({
      members: { $all: [user1, user2] },
    });

    if (conversation) {
      // Conversation already exists
      console.log('conversation id is',conversation)
         return conversation._id;
    } else {
      // Conversation doesn't exist, create a new one
      const newConversation = new Conversation({
        members:[user1,user2],
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
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const conversations = await Conversation.find({
      members: { $in: [req.user._id] },
    })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
};




// //get users which are not in a conversation list of a user  for showing them in suggestions
// export const getUsersWithoutConversations = async (req, res) => {
//   try {
//     const userConversations = await Conversation.find({
//       members: { $in: [req.user._id] },
//     });

//     const conversationMembers = userConversations.reduce(
//       (members, conversation) => members.concat(conversation.members),
//       []
//     );

//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const limit = 10;
//     const skip = (page - 1) * limit;

//     const usersWithoutConversations = await User.find({
//       _id: { $nin: conversationMembers },
//     })
//       .skip(skip)
//       .limit(limit)
//       .exec();

//     res.status(200).json(usersWithoutConversations);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };






