

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
  const [searchValue,setSearchValue] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
 

  const { user } = useSelector((state) => state.user);
  const {  users, error } = useSelector( (state) => state.allUsers );
  const { message,error:addUserError } = useSelector((state) => state.addUser);

  const navigate= useNavigate();
  const dispatch= useDispatch();
  const alert = useAlert();
  

 

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 576px)");

    const handleResize = (e) => {
      console.log('e is',e,mediaQuery)
      setIsMobileView(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    handleResize(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  

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

  const getResult=(e)=>{
    if(e.target.value!==''){
      setSearchValue(true);
    }
    getAllUsers(e.target.value)
  }

  const trimmedName=(input)=>{
    
    if(isMobileView){
      if (input.length <= 15) {
        return input; // Return the input as is if it's not longer than maxLength
      } else {
        return input.substring(0, 15) + '...'; // Display the first 5 characters with three dots
      }
    }
    else{
      if (input.length <= 30) {
        return input; // Return the input as is if it's not longer than maxLength
      } else {
        return input.substring(0, 30) + '...'; // Display the first 5 characters with three dots
      }
    }
  }




  return (

<div className='mainDiv' >
    <div className="headerDiv" >
 
        
  <h1 >C H A T H U B</h1>

  <div className="main-chat-button" onClick={handleGoToMainChat}>
        <ChatBubbleIcon/>
      </div>
</div>
<div className="home-container">
      <div className="userInfo">
        <img src={user.avatar.url} className="Avatar" alt="User Avatar" />
        <strong>{user.name}</strong>
      </div>

      <div className="searchBar">
        <input type="text"
         placeholder="Search here..." 
        onChange={(e)=>getResult(e)}
        />
        </div>
        
        <div className="allUsers">
          {searchValue && users && users.map( (user) => (
            <div className= 'userAndAddButton' key={user._id}>
             <div className="homeUser">
            
             <img src={user.avatar.url} alt={user.name} className='avatar'  />

             <Typography>{trimmedName(user.name)}</Typography>
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

