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
      <div className="relative h-screen w-full flex flex-col font-Marvel">
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

        <div className="w-full h-screen flex justify-between p-5">
          <MyChats setIsGroupChatPopUp={setIsGroupChatPopUp} />
          <GroupChatPopUp
            setIsGroupChatPopUp={setIsGroupChatPopUp}
            isGroupChatPopUp={isGroupChatPopUp}
          />
          <ChatWindow />
        </div>
      </div>
    )
  );
};

export default Chat;
