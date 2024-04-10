import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ChatState } from "../context/ChatProvider";
import { getSender } from "../constants/chatDataRetrieval";

const NotificationsMenu = ({ isNotifications, setIsNotifications }) => {
  const { notifications, setSelectedChat, setNotifications, user } =
    ChatState();
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsNotifications(false);
    }
  };
  
  return (
    <div
      onClick={handleOutsideClick}
      className={`blurEffect z-10  flex h-screen w-screen items-center justify-center fixed top-0 left-0 ${
        isNotifications
          ? "opacity-100 translate-y-0 transition-all duration-500 ease-in-out "
          : " opacity-0 -translate-y-full transition-all duration-500"
      }
      }`}
    >
      <div
        className={`z-40 relative flex flex-col items-center  rounded-lg min-h-60 max-w-md w-11/12  bg-[#002133] py-5 `}
      >
        <FontAwesomeIcon
          onClick={() => setIsNotifications(false)}
          className="absolute right-5 text-2xl cursor-pointer  active:ring  px-3 py-2 rounded-lg hover:scale-105 hover:rotate-180 transition-transform active:scale-95 duration-300"
          icon={faXmark}
        />

        <div className="flex flex-col  mt-7 rounded-md  text-white p-2 gap-2">
          {notifications?.length === 0 ? (
            <h3>No new notifications</h3>
          ) : (
            notifications?.map((notification) => (
              <div
                className="cursor-pointer  text-left max-w-full bg-[#006761] px-4 py-1 rounded-lg"
                onClick={() => {
                  setSelectedChat(notification?.chat);
                  setNotifications(
                    notifications.filter((n) => n !== notification)
                  );
                  setIsNotifications(false);
                }}
                key={notification?._id}
              >
                {notification.chat?.isGroupChat ? (
                  <>
                    New Message in{" "}
                    <span className="font-extrabold text-yellow-500 hover:scale-105 transition-all duration-300">
                      {notification?.chat?.chatName}
                    </span>
                  </>
                ) : (
                  <>
                    New Message from{" "}
                    <span className="font-extrabold text-green-500 hover:scale-105 transition-all duration-300">
                      {notification?.sender?.name}
                      {/* {getSender(notification?.chat?.users, user)?.name} */}
                    </span>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsMenu;
