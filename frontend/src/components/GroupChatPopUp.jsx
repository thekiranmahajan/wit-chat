import React, { useState } from "react";
import { toast } from "react-toastify";
import { ChatState } from "../context/ChatProvider";

const GroupChatPopUp = ({ isGroupChatPopUp, setIsGroupChatPopUp }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const { user, chats, setChats } = ChatState();
  
  return <div className="  ">GroupChatPopUp</div>;
};

export default GroupChatPopUp;
