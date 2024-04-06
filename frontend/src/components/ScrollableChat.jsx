import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../constants/chatDataRetrieval";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed className=" no-scrollbar pb-5 rounded-xl">
      {messages &&
        messages.map((message, index) => (
          <div
            key={message._id}
            className="flex  items-center gap-1 no-scrollbar px-4 "
          >
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <div
                className={`h-8 w-8 mt-${
                  isSameUser(messages, message, index) ? 1 : 8
                }`}
                title={message?.sender?.name}
              >
                <img
                  className="h-full w-full cursor-pointer object-contain rounded-full"
                  src={message?.sender?.avatar}
                  alt={message?.sender?.name}
                />
              </div>
            )}
            <span
              style={{
                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  index,
                  user._id
                ),
              }}
              className={`rounded-2xl py-1 px-4  max-w-[70%] break-words   
              ${
                message.sender._id === user._id
                  ? "bg-[#002133]"
                  : "bg-[#36a765]"
              } mt-${isSameUser(messages, message, index) ? 1 : 8}         
             `}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
