import { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  // const [chats, setChats] = useState([]);
  // const fetchChats = async () => {
  //   try {
  //     const { data } = await axios.get("/api/chat");
  //     setChats(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("There was a problem fetching the chats:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  return (
    <div className="text-2xl flex items-center justify-center flex-col bg-fuchsia-600">
      CHAT PAGE
    </div>
  );
};

export default Chat;
