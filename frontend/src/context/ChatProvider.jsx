import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        isProfilePopUp,
        setIsProfilePopUp,
      }}
    >
      <ToastContainer />
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);
