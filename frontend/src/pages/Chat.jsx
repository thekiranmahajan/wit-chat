import { ChatState } from "../context/ChatProvider";
import {
  UserSearchSideBar,
  NavBar,
  ProfilePopUp,
  MyChats,
  ChatWindow,
} from "../components";
import { useEffect, useState } from "react";

const Chat = () => {
  const { setUser, user } = ChatState();
  const [isSidebar, setIsSidebar] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);
  return (
    user !== null && (
      <div className="relative h-screen w-full flex flex-col font-Marvel">
        <NavBar
          setIsSidebar={setIsSidebar}
          setIsPopUp={setIsPopUp}
          isSidebar={isSidebar}
        />
        <UserSearchSideBar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
        <ProfilePopUp isPopUp={isPopUp} setIsPopUp={setIsPopUp} />

        <div className="w-full h-screen flex justify-between p-5">
          <MyChats />
          <ChatWindow />
        </div>
      </div>
    )
  );
};

export default Chat;
