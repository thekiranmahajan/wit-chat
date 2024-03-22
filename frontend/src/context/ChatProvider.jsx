import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      <ToastContainer />
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);
