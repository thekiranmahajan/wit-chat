import { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";

const Chat = () => {
  const { user } = ChatState();
  return (
    <div className=" h-screen w-full text-2xl flex items-center justify-center flex-col">
      CHAT PAGE
    </div>
  );
};

export default Chat;
