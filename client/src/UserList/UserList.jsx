import React from "react";
import "./UserList.css";

const UserList = () => {
  const userList = [
    { id: 1, avatar: "User 1 Avatar", name: "User 1", lastMessage: "Last message from User 1", timestamp: "10:00 AM" },
    { id: 2, avatar: "User 2 Avatar", name: "User 2", lastMessage: "Last message from User 2", timestamp: "11:00 AM" },
    { id: 3, avatar: "User 3 Avatar", name: "User 3", lastMessage: "Last message from User 3", timestamp: "12:00 PM" }
  ];

  return (
    <div className="contact-list">
      {userList.map((user) => (
        <div className="contact-list-item" key={user.id}>
          <div className="avatar">{user.avatar}</div>   
          <div className="user-info">
            <div className="name-timestamp">
            <h2 className="name">{user.name}</h2>
            <p className="timestamp">{user.timestamp}</p>
            </div>
            <p className="last-message">{user.lastMessage}</p>
         
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
