import React from "react";

const SearchedUserCard = ({ name, email, avatar, handleAccessChat }) => {
  return (
    <div
      onClick={handleAccessChat}
      className="bg-[#006761] mt-2 h-12 w-full rounded-md flex items-center p-3 gap-5 overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all"
    >
      <div className="sm:h-10 sm:w-10 h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
        <img
          className="object-cover h-full w-full rounded-full"
          src={avatar}
          alt={name}
        />
      </div>
      <div className="leading-5 truncate h-12 w-3/4 flex flex-col justify-center py-1">
        <h4 className="text-lg font-bold text-gray-200 truncate">{name}</h4>
        <p className="text-sm text-gray-300 truncate">
          <span className="font-extrabold text-gray-200">Email: </span> {email}
        </p>
      </div>
    </div>
  );
};

export default SearchedUserCard;
