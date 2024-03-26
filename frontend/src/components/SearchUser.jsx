import React from "react";

const SearchUser = ({ name, email, avatar }) => {
  return (
    <div className="bg-[#006761] mt-2 h-12 w-full rounded-md flex items-center p-3 gap-5 overflow-hidden cursor-pointer">
      <div className="sm:h-10 sm:w-10 h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
        <img
          className="object-cover h-full w-full rounded-full"
          src={avatar}
          alt={name}
        />
      </div>
      <div className="leading-5 truncate w-3/4 py-10">
        <h4 className="text-lg font-bold text-gray-200 truncate">{name}</h4>
        <p className="text-sm text-gray-300 truncate">
          <span className="font-extrabold text-gray-200">Email: </span> {email}
        </p>
      </div>
    </div>
  );
};

export default SearchUser;
