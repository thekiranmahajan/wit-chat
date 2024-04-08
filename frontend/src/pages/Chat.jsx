import { ChatState } from "../context/ChatProvider";
import {
  UserSearchSideBar,
  NavBar,
  ProfilePopUp,
  MyChats,
  ChatWindow,
  GroupCreatePopUp,
} from "../components";
import { useState } from "react";

const Chat = () => {
  const { user } = ChatState();
  const [isSidebar, setIsSidebar] = useState(false);
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isGroupChatPopUp, setIsGroupChatPopUp] = useState(false);

  return (
    user !== null && (
      <div className="relative h-screen w-full flex flex-col font-Marvel pb-2 ">
        <NavBar
          setIsSidebar={setIsSidebar}
          setIsProfilePopUp={setIsProfilePopUp}
          isSidebar={isSidebar}
        />
        <UserSearchSideBar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
        <ProfilePopUp
          isProfilePopUp={isProfilePopUp}
          setIsProfilePopUp={setIsProfilePopUp}
          user={user}
        />
        <GroupCreatePopUp
          setIsGroupChatPopUp={setIsGroupChatPopUp}
          isGroupChatPopUp={isGroupChatPopUp}
        />
        <div className="w-full h-full flex justify-center py-4 px-1 sm:p-4 overflow-hidden md:gap-4 ">
          <MyChats
            setIsGroupChatPopUp={setIsGroupChatPopUp}
            setIsSidebar={setIsSidebar}
          />
          <ChatWindow />
        </div>
      </div>
    )
  );
};

export default Chat;
