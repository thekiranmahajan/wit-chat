import {
  faBell,
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NavBar = ({ isSearchClicked, setIsSearchClicked, user }) => {
  return (
    <div className="blurEffect w-full h-16 flex items-center justify-between flex-wrap sm:px-8 px-4">
      <div
        onClick={() => setIsSearchClicked((prev) => !prev)}
        className="bg-[#002133] h-12 rounded-md w-12 sm:w-40 flex p-4 items-center text-xl gap-3 cursor-pointer hover:scale-105 transition-transform active:scale-95 duration-300 font-bold truncate"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        Start a Chat
      </div>
      <h2 className="font-mono font-extrabold sm:text-2xl text-xl">witChat</h2>
      <div className="flex items-center justify-between w-36 gap-2">
        <div className="bg-[#002133] h-12 rounded-md w-12 flex p-4 items-center text-xl  cursor-pointer hover:scale-105 transition-transform active:scale-95 duration-300">
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div className="h-12 w-20 flex items-center justify-center p-2 hover:backdrop-brightness-75 bg-[#002133] rounded-md gap-2 cursor-pointer hover:scale-105 transition-transform active:scale-95 duration-300">
          <img
            className="h-10 w-10 rounded-full object-contain"
            src={user.avatar}
            alt="avatar"
          />
          <FontAwesomeIcon
            className="text-xs mt-2 hover:rotate-180 transition-all duration-300"
            icon={faChevronDown}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
