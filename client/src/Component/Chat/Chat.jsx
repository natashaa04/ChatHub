import React, { useState, useContext, useEffect, useRef, } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { addMessage} from "../../Actions/Message";
import { logoutUser } from "../../Actions/User";
import { useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { useMyContext } from "../../MyContextProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import axios from "axios";
import { getConversation } from "../../Actions/Message";
import { useAlert } from "react-alert";
import { getAllUsers } from "../../Actions/User";
import { formatDistanceToNow, setWeekYear } from 'date-fns'
import InputEmoji from "react-input-emoji";
import Home from "../Home/Home";
import { useNavigate } from 'react-router-dom';



function Chat() {

  
  // const [currentChatMember, setCurrentChatMember] = useState(null);
  const [Messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [page, setPage] = useState(2);
  const [loading,setLoading]=useState(false);
  const [conversations,setConversations]=useState(null)
  const [lastMessage,setLastMessage]= useState(null);

  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  
  
  const alert = useAlert();
   const [Users, setUsers]= useState([]);

 
  const {  users, error } = useSelector(
    (state) => state.allUsers
  );

  const {currentChatUser,setCurrentChatUser}= useMyContext();
 


 


  const navigate= useNavigate();
  const socket = useRef();
  const { user } = useSelector((state) => state.user)
  const scrollRef = useRef();

  

  const { loading: AddMessageLoad, responseMessage, error: addMessageError } = useSelector(
    (state) => state.addMessage
  );
  


  useEffect(()=>{
    getAllUsers();
  },[])


  useEffect(()=>{

    if(users){
      setUsers(users);
      console.log('users are',Users)
    }
    
  },[users])



  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.emit("addUser", user._id);

    socket.current.on("getMessage", (data) => {
      console.log('new real time message is',data);
      setArrivalMessage(data);
    });
  }, [user]);

  useEffect(() => {
    arrivalMessage && currentChatUser._id == arrivalMessage.sender &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChatUser]);

  useEffect(() => {
    // socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
  console.log('online user is',onlineUsers);
    });
  }, [user]);


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);



  const updateChat=async(chatUser)=>{

    console.log('chatUser is',chatUser)
    
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
      
    }catch(err){
      console.log(`error while getting messages is ${err}`)
    }
    
    
  
  }

  const handleSubmit = async (e) => {
    
    // e.preventDefault();
    if(newMessage){
  console.log('new message is', newMessage)
    const message = {
      sender: user._id,
      text: newMessage,
      reciever: currentChatUser._id,
      // conversationId: conversations,
      createdAt: new Date().toISOString()

    };


    setMessages((prev)=>[...prev,message]);
    console.log('messages are', Messages)

    socket.current.emit("sendMessage", {
      sender: user._id,
      text: newMessage,
      reciever: currentChatUser._id,
      // conversationId: conversations,
      createdAt: new Date().toISOString(),
    });
    addMessage(message)


    setNewMessage("");
  }


  };

function generateMessageKey(message) {
  const senderName = message.sender; 
  const createdAt = message.createdAt; 

  
  
  const key = `${senderName}_${createdAt}`;

  return key;
}


  const fetchMoreData = async () => {
    console.log(`currentchatuser is ${currentChatUser._id} and ${user._id}`)
    
try{
    
    if (hasMoreMessages) {
      console.log('page is in fetch data',page);
      const { data } = await axios.get(`http://localhost:8000/api/v1/getMessages/${user._id}/${currentChatUser._id}/${page}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
    console.log(`more messages are ${data.length} and it is ${page}`)

      if (data) {
        if (data.length > 0) {
          setMessages((prev)=>[...data,...prev]);
          setPage(page + 1);
      
        } else {
          setHasMoreMessages(false);
        }
       
      }
    }
  }catch(err){
    console.log(`error while fetching more messages is ${err}`)
  }
  };
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
 const lastMessageShort=(input)=>{
  if (input.length <= 8) {
    return input; // Return the input as is if it's not longer than maxLength
  } else {
    return input.substring(0, 8) + '...'; // Display the first 5 characters with three dots
  }

  }
    

  return (
    <div className="chat-app">
    
        <div className="headerDiv" >
  
        
          <h1 onClick={()=>navigate('/')}>C h a t H u b</h1>
        
          <div className="logoutDiv" onClick={logoutUser}><LogoutIcon >Logout</LogoutIcon>Logout</div>
        </div>
      
      <div className="container">
        <div className="sidebar">
            
    <div className="contact-list">
      {Users.map((chatUser) => (
        <div key ={chatUser._id} className="contact-list-item"  onClick={() => updateChat(chatUser)}>
          <img src ={chatUser.avatar.url}className="avatar"></img>   
          <div className="user-info">
            <div className="name-timestamp">
            <h2 className="name">{chatUser.name}</h2>
            <p className="timestamp">{formatDistanceToNow(new Date(chatUser.updatedAt), { addSuffix: true })}</p>
            </div>
            <p className="last-message">{lastMessageShort(chatUser.lastMessage)}</p>
         
          </div>
        </div>
        
      ))}
    </div>
        </div>
        {currentChatUser && 
          <div className="chat-window">
            <div className="chat-header">
              <img src={currentChatUser.avatar.url} className="avatar"></img>
              <div className="user-info">
                <strong>{currentChatUser.name}</strong>
                <p className="online-status">Online</p>
              </div>
            </div>
             <div
   id="scrollableDiv"
     style={{
    height: 300,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
  }}
>
  
  <InfiniteScroll
    dataLength={Messages.length}
    next={fetchMoreData}
    style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
    inverse={true} 
    hasMore={hasMoreMessages}
    loader={<h4>Loading...</h4>}
    scrollableTarget="scrollableDiv"
  >  
            <div className="message-list">
              {
               Messages.map((message) => (
                <div
                  key={generateMessageKey(message)}
                  className={`${message.sender == currentChatUser._id ? 'message-right' : 'message-left'}`}
                > 
                
                  <div className="message-content">{message.text}</div>
                  <div className="message-timestamp">{formatDate(message.createdAt)} at {formatTime(message.createdAt)}</div>
                </div>
              ))}
            </div>
             </InfiniteScroll>
    
    </div> 


            <div className="input-box">
      <InputEmoji
      value={newMessage}
      onChange={setNewMessage}
      cleanOnEnter
      onEnter={handleSubmit}
      placeholder="Type a message"
    />
            </div>
          </div>

        }
      </div>



    </div>

  );
}

export default Chat;


