import { ChatState } from "../context/ChatProvider";
import { SideSearchDrawer, NavBar } from "../components";
import { useState } from "react";
import ProfilePopUp from "../components/ProfilePopUp";

const Chat = () => {
  const { user } = ChatState();
  const [isSidebar, setIsSidebar] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);

  return (
    user && (
      <div className="relative h-screen w-full flex font-Marvel">
        <NavBar
          setIsSidebar={setIsSidebar}
          setIsPopUp={setIsPopUp}
          isSidebar={isSidebar}
          user={user}
        />
        <SideSearchDrawer
          isSidebar={isSidebar}
          setIsSidebar={setIsSidebar}
          user={user}
        />

        <ProfilePopUp isPopUp={isPopUp} setIsPopUp={setIsPopUp} user={user} />
      </div>
    )
  );
};

export default Chat;
