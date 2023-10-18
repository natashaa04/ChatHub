import React, { useState, useContext, useEffect, useRef, } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMyContext } from "../../MyContextProvider";
import { useAlert } from "react-alert";
import { formatDistanceToNow,  } from 'date-fns'
import './ContactList.css'

function ContactList() {


  const [page, setPage] = useState(2);
  const [loading,setLoading]=useState(false);
  const [callUser,setCallUser]= useState(false);

const [hasMoreMessages, setHasMoreMessages] = useState(true);
  
  
  const alert = useAlert();
   const [Users, setUsers]= useState([]);

 
  
  const {  user } = useSelector(
    (state) => state.user
  );

  const {currentChatUser,setCurrentChatUser,Messages, setMessages}= useMyContext();
 

  useEffect(() => {
    // console.log('userrr is',user);
  }, []);

  
  const socket = useRef();
  const scrollRef = useRef();

  


      const lastMessageShort=(input)=>{
        if (input.length <= 8) {
          return input;
        } else {
          return input.substring(0, 8) + '...'; 
        }
      
        }
        const nameShort=(input)=>{
          if (input.length <= 8) {
            return input; 
          } else {
            return input.substring(0, 8) + '...';
          }
        
          }

        const updateChat=async(chatUser)=>{

          // console.log('chatUser is',chatUser)
          
          await setCurrentChatUser(chatUser);
      
          setLoading(true);
        
          try{
            
            console.log('page is' ,page);
            const { data } = await axios.get(`http://localhost:8000/api/v1/getMessages/${user._id}/${chatUser._id}/1`, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            console.log(`messages are ${data} and loading is ${loading}`)
            setMessages(data);
            setLoading(false);
            setCallUser(!callUser);
          }catch(err){
            console.log(`error while getting messages is ${err}`)
          }
          
          
        
        }
      

  return (
    <div className="contact-list">
    {user.conversationUser.map((chatUser) => (
      <div key ={chatUser.userId._id} className="contact-list-item"  onClick={() => updateChat(chatUser.userId)}>
        <img src ={chatUser.userId.avatar.url}className="avatar"></img>   
        <div className="user-info">
          <div className="name-timestamp">
          <h2 className="name">{nameShort(chatUser.userId.name)}</h2>
          <p className="timestamp">{formatDistanceToNow(new Date(chatUser.lastMessageTime), { addSuffix: true })}</p>
          </div>
          <p className="last-message">{lastMessageShort(chatUser.lastMessage)}</p>
       
        </div>
      </div>
      
    ))}
  </div>
      
  );
  
}

export default ContactList;
