import { ChatState } from "../context/ChatProvider";
import { SideSearchDrawer, NavBar } from "../components";
import { useState } from "react";

const Chat = () => {
  const { user } = ChatState();
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  return (
    <div className=" h-screen w-full flex font-Marvel">
      <NavBar setIsSearchClicked={setIsSearchClicked} user={user} />
      <SideSearchDrawer
        isSearchClicked={isSearchClicked}
        setIsSearchClicked={setIsSearchClicked}
      />
    </div>
  );
};

export default Chat;
