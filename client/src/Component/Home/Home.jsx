

import React, { useState, useEffect } from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import User from "../User/User";

const Home = () => {
  const [allUser, setAllUser] = useState([]);
  const { user } = useSelector((state) => state.user);

  const handleGoToMainChat = () => {
    // Handle the navigation to the main chat page here
  };

  return (
    <>
    <div className="home-container">
      <button className="main-chat-button" onClick={handleGoToMainChat}>
        Go to Main Chat
      </button>
      <div className="user-info">
        <img src={user.avatar.url} className="avatar" alt="User Avatar" />
        <strong>Hello {user.name}</strong>
      </div>

      <div className="searchBar">
        <input type="text" placeholder="Search here..." />
        </div>
        <div className="allUsers">
          {allUser.map((user) => {
            <User key={user.id} user={user} />
          })
        }
 
      </div>
    </div>
    </>
  );
};

export default Home;
