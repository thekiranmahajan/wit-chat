import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import Button from "./Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserSearchShimmer from "./UserSearchShimmer";
import { getSender } from "../constants/chatDataRetrieval";
const MyChats = ({ setIsGroupChatPopUp, setIsSidebar }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  const {
    selectedChat,
    setSelectedChat,
    chats,
    fetchChats,
    user,
    isChatLoading,
    notifications,
    setNotifications,
  } = ChatState();
  console.log(notifications);
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [user]);

  const HandleGroupChat = () => {
    setIsGroupChatPopUp(true);
    setIsSidebar(false);
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);

    const updatedNotifications = notifications.filter(
      (notification) =>
        notification.sender._id !== chat?.latestMessage?.sender?._id ||
        notification.chat?._id !== chat?._id
    );
    setNotifications(updatedNotifications);
  };

  const hasNotification = (chat) => {
    return notifications.some(
      (notification) =>
        notification.sender._id === chat?.latestMessage?.sender?._id &&
        notification.chat?._id === chat?._id
    );
  };
  return (
    <div
      className={`${
        selectedChat ? "hidden" : "flex"
      } blurEffect max-w-md md:w-2/5 w-full h-full rounded-lg flex-col p-5 shadow-lg items-center gap-4 md:flex`}
    >
      <div className="flex w-full items-center justify-between flex-col xl:flex-row gap-2">
        <h2 className="text-2xl md:text-3xl  font-extrabold">My Chats</h2>
        <Button
          title="Create A Group Chat"
          styles="bg-[#002133] shadow-lg  relative hover:scale-105 transition-transform active:scale-95 duration-300 font-bold truncate w-full   xl:w-[80%] lg:max-w-64"
          iconName={faPlus}
          onClick={HandleGroupChat}
        />
      </div>

      <div className="h-full w-11/12 overflow-y-scroll no-scrollbar overflow-x-hidden py-5 px-2 ">
        {isChatLoading ? (
          <UserSearchShimmer noOfTimes={10} />
        ) : chats?.length !== 0 ? (
          <div className="flex flex-col">
            {chats?.map((chat) => (
              <div
                key={chat?._id}
                onClick={() => handleChatClick(chat)}
                className={`bg-[#006761] mt-2 h-14 w-full rounded-md flex items-center p-3 overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ${
                  selectedChat === chat && "bg-[#004451db]"
                }`}
              >
                <div className=" relative sm:h-10 sm:w-10 h-8 w-8 rounded-full  flex items-center justify-center">
                  {!chat?.isGroupChat && (
                    <img
                      className="h-full w-full object-cover rounded-full overflow-hidden"
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
                  {hasNotification(chat) && (
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <div className="relative leading-5 truncate h-12 w-3/4 flex flex-col justify-center py-1 ml-4 ">
                  <h2 className="font-extrabold">
                    {chat?.isGroupChat
                      ? chat?.chatName
                      : getSender(chat?.users, loggedUser)?.name}
                  </h2>
                  {chat?.latestMessage?.content ? (
                    <p className="text-sm text-[#91AA66] w-11/12 truncate overflow-hidden">
                      <span className="font-extrabold text-slate-300">
                        {chat?.latestMessage?.sender?.name === user?.name
                          ? "You"
                          : chat?.latestMessage?.sender?.name}
                        :{" "}
                      </span>

                      {chat?.latestMessage?.content}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2>
            No chats found!... Search a user or create a group to start chatting
            with friends.
          </h2>
        )}
      </div>
    </div>
  );
};

export default MyChats;
