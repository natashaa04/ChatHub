import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },

  avatar: {
    public_id: {
      type: String
    },
    url: {
      type: String    
    } ,
  },

  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters"],
  
  },
  lastMessage:{
    type:String,
  },
  

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
},
{ timestamps: true });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, 'abacabc456^%$');
};


 const User=mongoose.model('User',userSchema);



 export default User;