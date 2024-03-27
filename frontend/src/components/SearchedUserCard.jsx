import React from "react";
import { loader } from "../assets";
const SearchedUserCard = ({
  name,
  email,
  avatar,
  handleClick,
  isChatLoading,
}) => {
  return (
    <div
      onClick={handleClick}
      className="bg-[#006761] mt-2 h-12 w-full rounded-md flex items-center p-3 gap-5 overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all"
    >
      <div className="sm:h-10 sm:w-10 h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
        <img
          className="object-cover h-full w-full rounded-full"
          src={avatar}
          alt={name}
        />
      </div>
      <div className="relative leading-5 truncate h-12 w-3/4 flex flex-col justify-center py-1">
        <h4 className="text-lg font-bold text-gray-200 truncate">{name}</h4>
        <p className="text-sm text-gray-300 truncate">
          <span className="font-extrabold text-gray-200">Email: </span> {email}
        </p>
        {isChatLoading && (
          <img className="absolute right-0 h-8 w-8" src={loader} alt="loader" />
        )}
      </div>
    </div>
  );
};

export default SearchedUserCard;
