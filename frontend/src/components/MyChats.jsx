import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();

  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  return <div>MyChats</div>;
};

export default MyChats;
