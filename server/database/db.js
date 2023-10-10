import mongoose from "mongoose";
import Message from "../models/MessageeSchema.js";

export const Connection=async(username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@cluster0.n4yg16t.mongodb.net/?retryWrites=true&w=majority`
    try{

        mongoose.connect(URL,{ 
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useNewUrlParser:true,
            useUnifiedTopology:true

        
        })

   
        console.log('database connected succesfully');

    }catch(error){
        console.log('Error while connection database is',error.message);
    }
}







