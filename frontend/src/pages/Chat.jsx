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
        />
        <GroupCreatePopUp
          setIsGroupChatPopUp={setIsGroupChatPopUp}
          isGroupChatPopUp={isGroupChatPopUp}
        />
        <div className="w-full h-[91%] flex justify-center p-5 overflow-hidden gap-4 md:gap-8 ">
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
