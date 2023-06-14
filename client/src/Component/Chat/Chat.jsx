import React, { useState } from "react";
import "./App.css";
import UserList from "./UserList/UserList";

function App() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "John", content: "Hello!", timestamp: "10:00 AM" },
    { id: 2, sender: "Jane", content: "Hi there!", timestamp: "10:01 AM" },
    { id: 3, sender: "John", content: "How are you?", timestamp: "10:02 AM" },
  ]);

  return (
    <div className="chat-app">
      <header >
        <h1>Chat Application</h1>
      </header>
      <div className="container">
        <div className="sidebar">
          <UserList />
        </div>
        <div className="chat-window">
          <div className="chat-header">
            <div className="avatar"></div>
            <div className="user-info">
              <h2>John</h2>
              <p className="online-status">Online</p>
            </div>
          </div>
          <div className="message-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "John" ? "message-right" : "message-left"
                }`}
              >
                <div className="message-content">{message.content}</div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            ))}
          </div>
          <div className="input-box">
            <input type="text" placeholder="Type your message" />
            <button className="send-button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



