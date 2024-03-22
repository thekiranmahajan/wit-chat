import { ChatState } from "../context/ChatProvider";
import { SideSearchDrawer, NavBar } from "../components";

const Chat = () => {
  const { user } = ChatState();
  return (
    <div className=" h-screen w-full flex font-Marvel">
      <NavBar />
      {user && <SideSearchDrawer />}
    </div>
  );
};

export default Chat;
