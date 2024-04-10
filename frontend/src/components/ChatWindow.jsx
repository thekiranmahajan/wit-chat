import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { getSender } from "../constants/chatDataRetrieval";
import ProfilePopUp from "./ProfilePopUp";
import GroupUpdatePopUp from "./GroupUpdatePopUp";
import { loader, animationData } from "../assets";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./ScrollableChat";
import { socket } from "../constants/socket";
import Lottie from "react-lottie";
var selectedChatCampare;

const ChatWindow = () => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    notifications,
    setNotifications,
    fetchChats,
  } = ChatState();
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isGroupUpdatePopUp, setIsGroupUpdatePopUp] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocketConnected, setIsSockectConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => setIsSockectConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    setNewMessage("");
    fetchMessages();
    selectedChatCampare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message_received", (newMessageReceived) => {
      if (
        !selectedChatCampare ||
        selectedChatCampare._id !== newMessageReceived.chat._id
      ) {
        // Give Notification
        if (!notifications.includes(newMessageReceived)) {
          setNotifications([newMessageReceived, ...notifications]);
          fetchChats();
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const handleChatInfo = () => {
    selectedChat?.isGroupChat
      ? setIsGroupUpdatePopUp(true)
      : setIsProfilePopUp(true);
  };
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
      setMessages(data);
      setIsLoading(false);

      socket.emit("join_chat", selectedChat._id);
    } catch (error) {
      toast.error(`${error.message}`, {
        theme: "dark",
      });
      setIsLoading(false);
    }
  };
  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
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
            content: newMessage.trim(),
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new_message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error(`${error.message}`, {
          theme: "dark",
        });
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      socket.emit("stop_typing", selectedChat._id);
      sendMessage();
    }
  };
  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    // Typing indicator logic
    if (!isSocketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timeout = 2000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timeout && typing) {
        socket.emit("stop_typing", selectedChat._id);
        setTyping(false);
      }
    }, timeout);
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
          className={`bg-[#004351] h-[90%] rounded-lg w-full shadow-md p-5 flex justify-end flex-col  ${
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
                <ScrollableChat messages={messages} />

                <form
                  onKeyDown={handleKeyDown}
                  className="rounded-md flex items-center px-4 overflow-hidden bg-[#00655F] shadow-lg hover:ring-2 ring-[#3fa2d7] transition-all duration-300 truncate relative"
                >
                  {isTyping && (
                    <div className="absolute right-2">
                      <Lottie height={25} options={defaultOptions} />
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Type message and press Enter..."
                    className="bg-transparent outline-none border-none w-full p-4 truncate placeholder:text-sm h-full"
                    value={newMessage}
                    onChange={handleTyping}
                  />
                </form>
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
