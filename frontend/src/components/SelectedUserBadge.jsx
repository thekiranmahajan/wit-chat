import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SelectedUserBadge = ({ user, onClick }) => {
  return (
    <div className="min-w-14 h-8 truncate flex items-center gap-2 bg-[#B8B86A] text-gray-800 rounded-xl px-2 py-1 ">
      <FontAwesomeIcon
        onClick={onClick}
        className="cursor-pointer text-lg"
        icon={faXmark}
      />
      {user?.name}
    </div>
  );
};

export default SelectedUserBadge;
