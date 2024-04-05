import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../constants/chatDataRetrieval";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => (
          <div key={message._id} className="flex ">
            {isSameSender(messages, message, index, user._id) ||
              (isLastMessage(messages, index, user._id) && (
                <div className="h-8 w-8">
                  <img
                    className="h-full w-full cursor-pointer object-contain rounded-full"
                    src={message.sender.avatar}
                    alt={message.sender.avatar}
                  />
                </div>
              ))}
            <span className={`rounded-2xl py-1 px-4 $`} >{message.content}</span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
