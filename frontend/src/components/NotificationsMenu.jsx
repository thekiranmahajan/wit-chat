import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ChatState } from "../context/ChatProvider";

const NotificationsMenu = ({ isNotifications, setIsNotifications }) => {
  const { notifications, setNotifications } = ChatState;
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
        className={`z-40 relative flex flex-col items-center rounded-lg min-h-60 max-w-md w-11/12  bg-[#002133] py-5 `}
      >
        <FontAwesomeIcon
          onClick={() => setIsNotifications(false)}
          className="absolute right-5 text-2xl cursor-pointer  active:ring  px-3 py-2 rounded-lg hover:scale-105 hover:rotate-180 transition-transform active:scale-95 duration-300"
          icon={faXmark}
        />

        <div className="bg-red-500 z-50 h-10 w-10 text-white">
          {notifications?.length === 0 ? (
            <h3>No new notifications</h3>
          ) : (
            notifications?.map(() => <div></div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsMenu;
