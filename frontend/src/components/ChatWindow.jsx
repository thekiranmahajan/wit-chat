import React from "react";
import { ChatState } from "../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ChatWindow = () => {
  const { selectedChat, setIsProfilePopUp } = ChatState();
  return (
    <div className="hidden md:flex blurEffect  w-full h-full rounded-lg flex-col p-3 shadow-lg">
      <div className="h-[10%] w-full flex justify-between items-center px-4">
        <h2 className="text-2xl font-extrabold">UserName</h2>
        <FontAwesomeIcon
          className="bg-[#002133] h-5 w-5 rounded-md  flex p-3 items-center text-xl  cursor-pointer hover:scale-105 transition-transform active:scale-95 hover:ring-2 duration-300"
          icon={faUser}
          onClick={() => setIsProfilePopUp(true)}
        />
      </div>
      <div className="bg-[#004351] h-[90%] rounded-lg w-full shadow-md"></div>
    </div>
  );
};

export default ChatWindow;
