import { ChatState } from "../context/ChatProvider";
import { UserSearchSideBar, NavBar } from "../components";
import { useEffect, useState } from "react";
import ProfilePopUp from "../components/ProfilePopUp";

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
      <div className="relative h-screen w-full flex font-Marvel">
        <NavBar
          setIsSidebar={setIsSidebar}
          setIsPopUp={setIsPopUp}
          isSidebar={isSidebar}
        />
        <UserSearchSideBar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />

        <ProfilePopUp isPopUp={isPopUp} setIsPopUp={setIsPopUp} />
      </div>
    )
  );
};

export default Chat;
