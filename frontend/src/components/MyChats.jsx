import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import Button from "./Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserSearchShimmer from "./UserSearchShimmer";
import { getSender } from "../constants/chatDataRetrieval";
const MyChats = ({ setIsGroupChatPopUp, setIsSidebar }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: { authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast.error("Failed Fetch chats from API.", {
        theme: "dark",
      });
    }
  };
  const HandleGroupChat = () => {
    setIsGroupChatPopUp(true);
    setIsSidebar(false);
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <div className="blurEffect max-w-md md:w-2/6 w-full h-full rounded-lg flex flex-col p-5 shadow-lg items-center gap-4">
      <div className="flex w-full items-center justify-between flex-col lg:flex-row gap-2">
        <h2 className="text-2xl md:text-3xl  font-extrabold">My Chats</h2>
        <Button
          title="Create A Group Chat"
          styles="bg-[#002133] shadow-lg  relative hover:scale-105 transition-transform active:scale-95 duration-300 font-bold truncate w-full   lg:w-[80%] lg:max-w-64"
          iconName={faPlus}
          onClick={HandleGroupChat}
        />
      </div>

      <div className="h-full w-11/12 overflow-y-scroll no-scrollbar overflow-x-hidden py-5 px-2 ">
        {chats.length !== 0 ? (
          <div className="flex flex-col">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`bg-[#006761] mt-2 h-14 w-full rounded-md flex items-center p-3 overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ${
                  selectedChat === chat && "bg-[#91AA66]"
                }`}
              >
                <div className="sm:h-10 sm:w-10 h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
                  {!chat?.isGroupChat && (
                    <img
                      className="h-full w-full object-cover rounded-full"
                      src={getSender(chat?.users, loggedUser)?.avatar}
                      alt="avatar"
                    />
                  )}
                  {chat?.isGroupChat && (
                    <img
                      className="h-full w-full object-cover rounded-full"
                      src="https://i.pinimg.com/564x/98/53/c5/9853c5ae293810fc37fb567c8940c303.jpg"
                      alt="avatar"
                    />
                  )}
                </div>
                <div className="relative leading-5 truncate h-12 w-3/4 flex flex-col justify-center py-1 ml-4">
                  <h2 className=" ">
                    {chat?.isGroupChat
                      ? chat?.chatName
                      : getSender(chat?.users, loggedUser)?.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <UserSearchShimmer noOfTimes={10} />
        )}
      </div>
    </div>
  );
};

export default MyChats;
