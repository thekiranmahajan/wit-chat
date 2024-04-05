import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { getSender } from "../constants/chatDataRetrieval";
import ProfilePopUp from "./ProfilePopUp";
import GroupUpdatePopUp from "./GroupUpdatePopUp";
import { loader } from "../assets";
import FormField from "./FormField";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./ScrollableChat";

const ChatWindow = () => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isGroupUpdatePopUp, setIsGroupUpdatePopUp] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChatInfo = () => {
    selectedChat?.isGroupChat
      ? setIsGroupUpdatePopUp(true)
      : setIsProfilePopUp(true);
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setIsLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(`${error.message}`, {
        theme: "dark",
      });
      setIsLoading(false);
    }
  };
  const sendMessage = async (e) => {
    console.log("click");
    e.preventDefault();
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error(`${error.message}`, {
          theme: "dark",
        });
      }
    }
  };
  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    // Typing indicator logic
  };
  useEffect(() => {
    setNewMessage("");
  }, [selectedChat]);
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
          {selectedChat && isLoading ? (
            <img
              className=" flex h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 align-middle m-auto"
              src={loader}
              alt="loader"
            />
          ) : (
            selectedChat && (
              <>
                <div className="flex flex-col overflow-y-scroll ">
                  <ScrollableChat messages={messages} />
                </div>
                <FormField
                  inputType="text"
                  styles="m-0 px-0 w-full"
                  colorStyles="bg-[#00655F] shadow-lg hover:ring-2 ring-[#002133] transition-all duration-300"
                  placeholder="Type message and press Enter..."
                  handleOnChange={handleTyping}
                  value={newMessage}
                  handleOnKeyUp={sendMessage}
                />
              </>
            )
          )}
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
            fetchMessages={fetchMessages}
          />
        )
      )}
    </>
  );
};

export default ChatWindow;
