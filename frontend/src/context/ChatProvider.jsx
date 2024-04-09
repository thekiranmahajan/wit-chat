import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  const fetchChats = async () => {
    try {
      setIsChatLoading(true);
      const config = {
        headers: { authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      setIsChatLoading(false);
    } catch (error) {
      toast.error("Failed Fetch chats from API.", {
        theme: "dark",
      });
      setIsChatLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        fetchChats,
        isChatLoading,
        notifications,
        setNotifications,
      }}
    >
      <ToastContainer />
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);
