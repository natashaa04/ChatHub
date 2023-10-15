
import User from "../models/UserSchema.js";
import cloudinary from 'cloudinary';
import { getConversation } from "./conversation-controller.js";




export const register = async (req, res) => {
  try {
    const { avatar,name, email, password} = req.body;

    console.log(`name is  ${name} and email is ${email} and password is ${password}`);

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars"
    },function(error, result) {
       console.log(result,'result');
      console.log(error,'errror');
  },{timeout:120000});
     console.log(myCloud);

    user = await User.create({
      name,
      email,
      password,
        avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });
    // console.log(user);

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(`error while registering is ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const login=async(req,res)=>{


  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      
      

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).json({
      success: true,
      user,
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const logout = async (req, res) => {
  try {
    localStorage.removeItem("token");

    res.status(200).json({
        success: true,
        message: "Logged out",
      });
      
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const getAllUsers = async (req, res) => {
  try {
    // Assuming you have a way to identify the logged-in user
    const loggedInUserId = req.user.id; // Replace with the actual way you identify the user
     
    let users=[]
    if(req.query.name==''){
      res.status(200).json({success:true,users})
    }else{
    // Modify the query to exclude the logged-in user
     users = await User.find({
      _id: { $ne: loggedInUserId }, // Exclude the user with the same ID as the logged-in user
      name: { $regex: req.query.name, $options: "i" },
    }).sort({ createdAt: -1 }) ;

    res.status(200).json({
      success: true,
      users,
    });
  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user's profile
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Populate the conversationUser array with user details
    await user.populate({
      path: "conversationUser.userId",
      select: "name avatar", // Add the fields you want to select
    })

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error, 'error');
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





export const addUser = async(req, res) => {
  try {
    const {  userId } = req.params;

    // Get the conversation ID using the getConversation function
    const conversationId = await getConversation(req.user._id, userId);

   

    // Update the owner's conversationUser array
    const owner = await User.findById(req.user._id);

    if (!owner) {
      return res.status(404).json({ message: 'Owner user not found' });
    }

    const userExists = owner.conversationUser.some(userObj => userObj.userId.equals(userId));

    if (userExists) {
      return res.status(400).json({ message: 'this user is already in your conversation list' });
    }

    // Add the user to the conversationUser array with timestamp and conversation ID
    owner.conversationUser.push({
      userId: userId,
      lastMessageTime: new Date(),
      conversationId: conversationId,
    });

    await owner.save();

    res.status(200).json({ message: 'User added to your conversation list' });
  } catch (error) {
    console.error(error);
    console.log('add user error is',error)
    res.status(500).json(error);
  }
}