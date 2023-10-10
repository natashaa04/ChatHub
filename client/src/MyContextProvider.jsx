// MyContext.js
import React, { createContext, useContext, useState } from "react";

const MyContext = createContext('');

export function useMyContext() {
  return useContext(MyContext);
}

export function MyContextProvider({ children }) {
  
  const [currentChatUser, setCurrentChatUser] = useState(null);

  const updateValue = (newValue) => {
    setCurrentChatUser(newValue);
  };

  return (
    <MyContext.Provider value={{ currentChatUser, setCurrentChatUser }}>
      {children}
    </MyContext.Provider>
  );
}
