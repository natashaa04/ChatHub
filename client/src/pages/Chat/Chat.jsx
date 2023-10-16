import React, { useState} from "react";
import "./Chat.css";
import Header from "../../Components/header/Header";
import ContactList from "../../Components/ContactList/ContactList.jsx";
import ChatWindow from "../../Components/ChatWindow/ChatWindow";




function Chat() {


  return (
    <div className="chat-app">
    
      <Header/>
      
      <div className="container">
        <div className="sidebar">
           <ContactList/>
        </div>
       <ChatWindow/>
      </div>



    </div>

  );
}

export default Chat;


