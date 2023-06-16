
import User from "../models/UserSchema.js";
import cloudinary from 'cloudinary';





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
      .select("+password")
      .populate("posts followers following");

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

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
    console.log(res.cookies);
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
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const myProfile = async (req, res) => {
    try {
      // console.log(req.user._id,'sss');
      const user = await User.findOne({_id:req.user._id}) 
   
     
    
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error,'error');
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  