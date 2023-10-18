import React, { useState, useContext, useEffect, useRef, } from "react";
import { io } from "socket.io-client";
import { addMessage} from "../../Actions/Message";
import { useSelector } from "react-redux";
import { useMyContext } from "../../MyContextProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useAlert } from "react-alert";

import InputEmoji from "react-input-emoji";
import { useNavigate } from 'react-router-dom';
import { loadUser } from "../../Actions/User";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './ChatWindow.css'







function ChatWindow() {


//   const [Messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [page, setPage] = useState(2); 
  const [callUser,setCallUser]= useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  
  



 
  const {  user } = useSelector(   (state) => state.user);
  const {currentChatUser,setCurrentChatUser,Messages, setMessages}= useMyContext();
 



 


  const navigate= useNavigate();
  const socket = useRef();
  const scrollRef = useRef();
   const alert = useAlert();

  
  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.emit("addUser", user._id);

    socket.current.on("getMessage", (data) => {
      console.log('new real time message is',data);
      setArrivalMessage(data);
      loadUser();
    });
  }, [user]);

  useEffect(() => {

    arrivalMessage && currentChatUser._id == arrivalMessage.sender &&
      setMessages((prev) => [...prev, arrivalMessage]);

     if(arrivalMessage && arrivalMessage.sender!==currentChatUser._id){
 alert.success(`New Message from ${arrivalMessage.senderName}`)
     }
  }, [arrivalMessage, currentChatUser]);

  // useEffect(() => {
  //   // socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(users);
  // console.log('online user is',onlineUsers);
  //   });
  // }, [user]);


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);




  const handleSubmit = async (e) => {

    if (Messages.length === 0) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    
    // e.preventDefault();
    if(newMessage){
  // console.log('new message is', newMessage)
    const message = {
      sender: user._id,
      text: newMessage,
      reciever: currentChatUser._id,
      // conversationId: conversations,
      createdAt: new Date().toISOString()

    };


    setMessages((prev)=>[...prev,message]);
    // console.log('messages are', Messages)

    socket.current.emit("sendMessage", {
      sender: user._id,
      text: newMessage,
      reciever: currentChatUser._id,
      senderName:user.name,
      // conversationId: conversations,
      createdAt: new Date().toISOString(),
    });
    addMessage(message)


    setNewMessage("");
    setCallUser(!callUser);
  }

  };

  
  useEffect(()=>{
    loadUser();
    console.log('user is',user)
  },[callUser])




function generateMessageKey(message) {
  const senderName = message.sender; 
  const createdAt = message.createdAt; 
  const key = `${senderName}_${createdAt}`;
  return key;
}


  const fetchMoreData = async () => {
    // console.log(`currentchatuser is ${currentChatUser._id} and ${user._id}`)
    
try{
    
    if (hasMoreMessages) {
      // console.log('page is in fetch data',page);
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





  return (
    <>
           {currentChatUser && 
          <div className="chat-windoww">
            <div className="chat-header">
              <div onClick={()=>setCurrentChatUser(null)} >
              <ArrowBackIosIcon />
              </div>
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
    </>
  );
}

export default ChatWindow;
