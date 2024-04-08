import React, { useEffect, useRef } from "react";
import {
  formatTime,
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  shouldIncreaseSize,
} from "../constants/chatDataRetrieval";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const chatEndRef = useRef(null);
  useEffect(() => {
    if (messages.length) {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  const renderMessageContent = (content) => {
    if (content.includes("http://") || content.includes("https://")) {
      return (
        <a
          className="text-blue-400"
          href={content}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return content;
  };

  return (
    <div className="no-scrollbar rounded-xl scroll-smooth flex flex-col overflow-y-scroll overflow-x-hidden h-full w-full">
      {messages &&
        messages.map((message, index) => (
          <div
            key={message._id}
            className="flex  items-end gap-1 px-1 md:px-4 "
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
            <div
              style={{
                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  index,
                  user._id
                ),
              }}
              className={`rounded-2xl sm:rounded-3xl py-1 px-3 sm:px-5 sm:py-2 max-w-[80%] md:max-w-[70%] break-words flex flex-col overflow-hidden ${
                shouldIncreaseSize(message.content) ? "text-3xl" : ""
              }
              ${
                message.sender._id === user._id
                  ? "bg-[#006761]"
                  : "bg-[#002133]"
              } mt-${isSameUser(messages, message, index) ? 1 : 8}             
             `}
            >
              {renderMessageContent(message.content)}
              <span className="text-xs text-slate-300 self-end mt-1">
                {formatTime(message.createdAt)}
              </span>
            </div>
          </div>
        ))}
      <div className="mt-5" ref={chatEndRef} />
    </div>
  );
};

export default ScrollableChat;
