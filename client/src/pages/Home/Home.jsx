

import React, { useState, useEffect } from "react";
import "./Home.css";
import { useSelector , useDispatch} from "react-redux";
// import User from "../User/User";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { getAllUsers } from "../../Actions/User";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { addUser } from "../../Actions/User";
import { removeAddUserError ,removeAddUserMessage } from "../../Reducers/User";
import { removeUserError ,removeUserMessage } from "../../Reducers/User";
import { useAlert } from "react-alert";

const Home = () => {
  const [searchValue,setSearchhValue] = useState('');
  const { user } = useSelector((state) => state.user);

  const navigate= useNavigate();
  const dispatch= useDispatch();
  const alert = useAlert();
   const {  users, error } = useSelector(
    (state) => state.allUsers
  );
  const { message,error:addUserError } = useSelector((state) => state.addUser);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(removeUserError());
      
    }
    if (addUserError) {
      console.log('add user',addUserError)
        alert.error(addUserError);
        dispatch(removeAddUserError());
        
      }
    if (message) {
      alert.success(message);
      dispatch(removeAddUserMessage());
    
    }
  }, [alert, error, message,addUserError]);


  const handleGoToMainChat = () => {
    console.log('cat');
      navigate('/chats')
  };

  const addFunction=(userId)=>{
    addUser(userId);
  }



  return (

<div className='mainDiv' >
    <div className="headerDiv" >
 
        
  <h1 >C h a t H u b</h1>

  <div className="main-chat-button" onClick={handleGoToMainChat}>
        <ChatBubbleIcon/>
      </div>
</div>
<div className="home-container">
      <div className="userInfo">
        <img src={user.avatar.url} className="Avatar" alt="User Avatar" />
        <strong>Hello {user.name}</strong>
      </div>

      <div className="searchBar">
        <input type="text"
         placeholder="Search here..." 
        onChange={(e)=>getAllUsers(e.target.value)}
        />
        </div>
        
        <div className="allUsers">
          { users && users.map( (user) => (
            <div className= 'userAndAddButton' key={user._id}>
             <div className="homeUser">
            
             <img src={user.avatar.url} alt={user.name} className='avatar'  />

             <Typography>{user.name}</Typography>
             <div className='addButton'>
             <button onClick={()=>addFunction(user._id)} >ADD</button>
             </div>
            
           </div>
           </div>
               
          ))
        }
        
      </div>
    </div>
    </div>
    
  );
};

export default Home;

