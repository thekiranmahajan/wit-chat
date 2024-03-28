import { ChatState } from "../context/ChatProvider";
import {
  UserSearchSideBar,
  NavBar,
  ProfilePopUp,
  MyChats,
  ChatWindow,
  GroupChatPopUp,
} from "../components";
import { useEffect, useState } from "react";

const Chat = () => {
  const { setUser, user } = ChatState();
  const [isSidebar, setIsSidebar] = useState(false);
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isGroupChatPopUp, setIsGroupChatPopUp] = useState(false);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);
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
        <GroupChatPopUp
          setIsGroupChatPopUp={setIsGroupChatPopUp}
          isGroupChatPopUp={isGroupChatPopUp}
        />
        <div className="w-full h-[91%] flex justify-between p-5 overflow-hidden">
          <MyChats setIsGroupChatPopUp={setIsGroupChatPopUp} />

          <ChatWindow />
        </div>
      </div>
    )
  );
};

export default Chat;
