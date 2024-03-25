import { ChatState } from "../context/ChatProvider";
import { SideSearchDrawer, NavBar } from "../components";
import { useState } from "react";
import ProfilePopUp from "../components/ProfilePopUp";

const Chat = () => {
  const { user } = ChatState();
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [profilePopUp, setProfilePopUp] = useState(false);

  return (
    user && (
      <div className="relative h-screen w-full flex font-Marvel">
        <NavBar
          setIsSearchClicked={setIsSearchClicked}
          user={user}
          setProfilePopUp={setProfilePopUp}
        />
        <SideSearchDrawer
          isSearchClicked={isSearchClicked}
          setIsSearchClicked={setIsSearchClicked}
        />

        <ProfilePopUp
          profilePopUp={profilePopUp}
          setProfilePopUp={setProfilePopUp}
          user={user}
        />
      </div>
    )
  );
};

export default Chat;
