import React, { useState,useEffect } from "react";
import "./Chat.css";
import Header from "../../Components/header/Header";
import ContactList from "../../Components/ContactList/ContactList.jsx";
import ChatWindow from "../../Components/ChatWindow/ChatWindow";
import { useMyContext } from "../../MyContextProvider";



function Chat() {
  const [isMobileView, setIsMobileView] = useState(false);

  const {currentChatUser,setCurrentChatUser}= useMyContext();
 

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



  return (
    <div className="chat-app">
    
      <Header/>
      
      {!isMobileView ? <div className="container">
       <div className="sidebar">
           <ContactList/>
        </div>
        <div className="chat-window">
       <ChatWindow/>
      </div>
     </div> 
     :
     <div className="mobileContainer">
       {currentChatUser ? 
        <div className="chat-window-m">
       <ChatWindow/>
       </div>
      :
      <div className="sidebar-m">
           <ContactList/>
        </div> 
       
      }
     </div>
}

     
    </div>

  );
}

export default Chat;


