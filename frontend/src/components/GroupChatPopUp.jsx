import React, { useState } from "react";
import { toast } from "react-toastify";
import { ChatState } from "../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import FormField from "./FormField";
import axios from "axios";
import { loader } from "../assets";
import SearchedUserCard from "./SearchedUserCard";
import UserSearchShimmer from "./UserSearchShimmer";
import SelectedUserBadge from "./SelectedUserBadge";
const GroupChatPopUp = ({ isGroupChatPopUp, setIsGroupChatPopUp }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { user, chats, setChats } = ChatState();

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsGroupChatPopUp(false);
    }
  };

  const handleUserSearch = async (query) => {
    if (!query) return;

    try {
      setIsloading(true);
      const config = {
        headers: { authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(`/api/user?search=${query}`, config);
      console.log(data);
      setSearchedUsers(data);
      setIsloading(false);
    } catch (error) {
      toast.error("Something went wrong while search", {
        theme: "dark",
      });
      setIsloading(false);
    }
  };

  const handleAddMemeber = (selectedUser) => {
    console.log("member", selectedUser);
    if (selectedUsers?.includes(selectedUser)) {
      toast.warn("User already added", {
        theme: "dark",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, selectedUser]);
  };
  const handleUnselectUser = (user) => {};
  return (
    <div
      onClick={handleOutsideClick}
      className={`blurEffect z-10 absolute flex h-full w-full items-center justify-center  ${
        isGroupChatPopUp
          ? "opacity-100 -translate-y-0 transition-all duration-500 ease-in-out "
          : " opacity-0 -translate-y-full transition-all duration-500"
      }
  }`}
    >
      <div
        className={`z-40 relative flex flex-col items-center rounded-lg min-h-[500px] max-w-md w-11/12  bg-[#002133] py-5 `}
      >
        <FontAwesomeIcon
          onClick={() => setIsGroupChatPopUp(false)}
          className="absolute right-5 text-2xl cursor-pointer  active:ring  px-3 py-2 rounded-lg hover:scale-105 hover:rotate-180 transition-transform active:scale-95 duration-300"
          icon={faXmark}
        />
        <h2 className="font-extrabold text-2xl border-b-2 border-[#4A8B65] mb-4">
          Create a Group
        </h2>
        <div className="flex items-center flex-col gap-2 w-11/12">
          <FormField
            inputType="text"
            placeholder="Group Name"
            iconName={faUserGroup}
            styles="w-full"
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <FormField
            inputType="text"
            placeholder="Search Users to add ex. Ray"
            iconName={faSearch}
            styles="w-full"
            onChange={(e) => handleUserSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 h-20 overflow-y-scroll overflow-x-hidden no-scrollbar w-11/12 my-4 ">
          {selectedUsers?.map((user) => (
            <SelectedUserBadge
              key={user._id}
              user={user}
              onClick={() => handleUnselectUser(user)}
            />
          ))}
        </div>
        <div className="flex flex-col w-3/4">
          {isLoading ? (
            <UserSearchShimmer noOfTimes={4} />
          ) : (
            searchedUsers && (
              <div className="flex flex-col  justify-center w-full">
                {searchedUsers?.length === 0 && (
                  <p className="font-bold ml-4 mt-2">
                    No Users found with given name or email.
                  </p>
                )}
                {searchedUsers?.length !== 0 &&
                  searchedUsers
                    .slice(0, 4)
                    .map((searchedUser) => (
                      <SearchedUserCard
                        key={searchedUser._id}
                        {...searchedUser}
                        handleClick={() => handleAddMemeber(searchedUser)}
                      />
                    ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupChatPopUp;
