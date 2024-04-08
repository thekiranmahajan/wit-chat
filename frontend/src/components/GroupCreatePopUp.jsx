import React, { useEffect, useState } from "react";
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
import SearchedUserCard from "./SearchedUserCard";
import UserSearchShimmer from "./UserSearchShimmer";
import SelectedUserBadge from "./SelectedUserBadge";
import Button from "./Button";
const GroupCreatePopUp = ({ isGroupChatPopUp, setIsGroupChatPopUp }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { user, chats, setChats } = ChatState();

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsGroupChatPopUp(false);
  };

  const resetState = () => {
    setGroupChatName("");
    setSearchedUsers(null);
    setSelectedUsers([]);
    setSearchText("");
  };

  useEffect(() => {
    if (!isGroupChatPopUp) {
      resetState();
    }
  }, [isGroupChatPopUp]);

  const handleUserSearch = async (query) => {
    if (!query) return;
    try {
      setIsloading(true);
      const config = {
        headers: { authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchedUsers(data);
      setIsloading(false);
    } catch (error) {
      toast.error("Something went wrong while search", {
        theme: "dark",
      });
      setIsloading(false);
    }
  };

  const handleChangeSearchText = (e) => {
    const query = e.target.value;
    setSearchText(query);
    handleUserSearch(query);
  };

  const handleAddMemeber = (userToSelect) => {
    if (selectedUsers.some((user) => user._id === userToSelect._id)) {
      toast.warn("User already added", {
        theme: "dark",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToSelect]);
  };

  const handleUnselectUser = (userToUnselect) => {
    setSelectedUsers(
      selectedUsers.filter(
        (selectedUser) => selectedUser._id !== userToUnselect._id
      )
    );
  };
  const HandleCreateGroup = async () => {
    setIsloading(true);
    if (!groupChatName || !searchedUsers) {
      toast.warn("Please provide required fields", {
        theme: "dark",
      });
      setIsloading(false);
      return;
    }
    try {
      const config = {
        headers: { authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.post(
        "/api/chat/create-group",
        {
          name: groupChatName,
          users: JSON.stringify(
            selectedUsers.map((selectedUser) => selectedUser._id)
          ),
        },
        config
      );
      setChats([data, ...chats]);
      setIsloading(false);
      setIsGroupChatPopUp(false);
      toast.success("Group chat created successfully!", {
        theme: "dark",
      });
    } catch (error) {
      if (selectedUsers.length <= 1) {
        toast.warn("Minimum 3 members needed", {
          theme: "dark",
        });
        setIsloading(false);
        return;
      }
      toast.error("Failed to create a group chat", {
        theme: "dark",
      });
      setIsloading(false);
    }
  };
  return (
    <div
      onClick={handleOutsideClick}
      className={`blurEffect z-10 fixed top-0 left-0 flex h-screen w-screen items-center justify-center  ${
        isGroupChatPopUp
          ? "opacity-100 -translate-y-0 transition-all duration-500 ease-in-out "
          : " opacity-0 -translate-y-full transition-all duration-500"
      }
  }`}
    >
      <div
        className={`z-40 relative flex flex-col items-center rounded-lg min-h-[540px] max-w-md w-11/12  bg-[#002133] py-5 `}
      >
        <FontAwesomeIcon
          onClick={handleClose}
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
            value={groupChatName}
            handleOnChange={(e) => setGroupChatName(e.target.value)}
          />
          <FormField
            inputType="text"
            placeholder="Search Users to add ex. Ray"
            iconName={faSearch}
            styles="w-full"
            value={searchText}
            handleOnChange={handleChangeSearchText}
          />
        </div>
        <div className="flex flex-wrap gap-2 h-12 overflow-y-scroll overflow-x-hidden no-scrollbar w-10/12 my-2 transition-all duration-500 shadow-inner shadow-[#004351] rounded-md p-2">
          {selectedUsers?.map((user) => (
            <SelectedUserBadge
              key={user._id}
              user={user}
              onClick={() => handleUnselectUser(user)}
            />
          ))}
        </div>
        <div className="flex flex-col w-3/4 mb-2">
          {isLoading ? (
            <UserSearchShimmer noOfTimes={4} />
          ) : (
            searchedUsers && (
              <div className="flex flex-col  justify-center w-full">
                {searchedUsers?.length === 0 && (
                  <p className="font-bold ml-4 mt-2">No such users found</p>
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
        <Button
          type="submit"
          title="Create"
          styles="bg-[#4A8B65] mt-4 !absolute bottom-4 hover:scale-105 transition-transform active:scale-95 duration-300"
          isLoading={isLoading}
          onClick={HandleCreateGroup}
        />
      </div>
    </div>
  );
};

export default GroupCreatePopUp;
