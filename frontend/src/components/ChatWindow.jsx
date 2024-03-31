import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { getSender } from "../constants/chatDataRetrieval";
import ProfilePopUp from "./ProfilePopUp";
import GroupUpdatePopUp from "./GroupUpdatePopUp";

const ChatWindow = () => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isGroupUpdatePopUp, setIsGroupUpdatePopUp] = useState(false);
  const handleChatInfo = () => {
    selectedChat?.isGroupChat
      ? setIsGroupUpdatePopUp(true)
      : setIsProfilePopUp(true);
  };
  return (
    <>
      <div
        className={`${
          selectedChat ? "flex" : "hidden"
        } md:flex blurEffect  w-full h-full rounded-lg flex-col p-3 shadow-lg `}
      >
        <div className="h-[10%] w-full  justify-between items-center flex">
          {selectedChat && (
            <>
              <div className="flex justify-between items-center h-full w-11/12 p-3">
                <FontAwesomeIcon
                  className="bg-[#002133] h-5 w-5 rounded-md  flex md:hidden p-3 items-center text-xl  cursor-pointer hover:scale-105 transition-transform active:scale-95 hover:ring-2 duration-300 "
                  icon={faArrowLeft}
                  onClick={() => setSelectedChat(null)}
                />
                <h2 className="text-2xl font-extrabold truncate">
                  {selectedChat?.isGroupChat ? (
                    <>{selectedChat?.chatName.toUpperCase()}</>
                  ) : (
                    <>{getSender(selectedChat?.users, user)?.name}</>
                  )}
                </h2>
              </div>
              <FontAwesomeIcon
                className={`bg-[#002133] h-5 w-5 rounded-md  p-3 items-center text-xl  cursor-pointer hover:scale-105 transition-transform active:scale-95 hover:ring-2 duration-300 ${
                  selectedChat ? "flex" : "hidden"
                }`}
                icon={faUser}
                onClick={handleChatInfo}
              />
            </>
          )}
        </div>
        <div
          className={`bg-[#004351] h-[90%] rounded-lg w-full shadow-md p-5 flex justify-end flex-col overflow-y-scroll no-scrollbar ${
            !selectedChat && "justify-center items-center"
          }`}
        >
          {!selectedChat && (
            <h2 className="text-2xl font-extrabold">
              Select a User/Group to start chatting...
            </h2>
          )}
          {/* messages will be here */}
        </div>
      </div>
      {selectedChat && !selectedChat?.isGroupChat ? (
        <ProfilePopUp
          isProfilePopUp={isProfilePopUp}
          setIsProfilePopUp={setIsProfilePopUp}
          user={getSender(selectedChat?.users, user)}
        />
      ) : (
        selectedChat && (
          <GroupUpdatePopUp
            isGroupUpdatePopUp={isGroupUpdatePopUp}
            setIsGroupUpdatePopUp={setIsGroupUpdatePopUp}
          />
        )
      )}
    </>
  );
};

export default ChatWindow;
