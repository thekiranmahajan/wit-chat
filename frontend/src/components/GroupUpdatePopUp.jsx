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

const GroupUpdatePopUp = ({
  setIsGroupUpdatePopUp,
  isGroupUpdatePopUp,
  fetchMessages,
}) => {
  const { user, selectedChat, setSelectedChat, fetchChats } = ChatState();
  const [groupChatName, setGroupChatName] = useState(
    selectedChat?.chatName || ""
  );
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isRenameLoading, setIsRenameloading] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsGroupUpdatePopUp(false);
  };

  const resetState = () => {
    setSearchedUsers(null);
    setSearchText("");
  };

  useEffect(() => {
    if (!isGroupUpdatePopUp) {
      resetState();
    }
  }, [isGroupUpdatePopUp]);

  const handleChangeSearchText = (e) => {
    const query = e.target.value;
    setSearchText(query);
    handleUserSearch(query);
  };

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

  const handleAddMemeber = async (userToAdd) => {
    if (selectedChat?.users.find((user) => user?._id === userToAdd._id)) {
      toast.warn("User already in group", {
        theme: "dark",
      });
      return;
    }

    if (selectedChat?.groupAdmin?._id !== user?._id) {
      toast.error("You must be admin to add a member", {
        theme: "dark",
      });
      return;
    }
    try {
      setIsloading(true);
      const config = {
        headers: { authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        "/api/chat/add-member",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );
      setSelectedChat(data);
      fetchChats();
      setIsloading(false);
      toast.success(`Added ${userToAdd.name} to ${selectedChat.chatName}`, {
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to add a member to group", {
        theme: "dark",
      });
      setIsloading(false);
    }
  };

  const handleRemoveUser = async (userToRemove) => {
    if (
      selectedChat?.groupAdmin?._id !== user?._id &&
      userToRemove?._id !== user?._id
    ) {
      toast.error("You must be admin to add a member", {
        theme: "dark",
      });
      return;
    }
    try {
      setIsloading(true);
      const config = {
        headers: { authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        "/api/chat/remove-member",
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );
      userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data);
      fetchChats();
      fetchMessages();
      setIsloading(false);
      userToRemove._id === user._id
        ? toast.success("You have left the group", {
            theme: "dark",
          })
        : toast.success(
            `Removed ${userToRemove.name} from ${selectedChat.chatName}`,
            {
              theme: "dark",
            }
          );
    } catch (error) {
      toast.error("Failed to Remove a member from group", {
        theme: "dark",
      });
      setIsloading(false);
    }
  };
  const handleGroupRename = async () => {
    if (!groupChatName) {
      toast.warn("Please add a Group name", {
        theme: "dark",
      });
      return;
    }
    if (groupChatName === selectedChat?.chatName) {
      toast.warn("Please make changes to Group name", {
        theme: "dark",
      });
      return;
    }

    try {
      setIsRenameloading(true);
      const config = {
        headers: { authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        "/api/chat/rename-group",
        {
          chatId: selectedChat?._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setRefreshChats((prev) => !prev);
      setIsRenameloading(false);
      setIsGroupUpdatePopUp(false);
      toast.success("Group name has been changed!", {
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to rename group", {
        theme: "dark",
      });
      setIsRenameloading(false);
      setGroupChatName("");
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className={`blurEffect z-10 fixed top-0 left-0 flex h-screen w-screen items-center justify-center  ${
        isGroupUpdatePopUp
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
          Update Group Info
        </h2>
        <div className="flex items-center flex-col gap-2 w-11/12">
          <div className="flex items-center justify-center w-11/12 gap-2">
            <FormField
              inputType="text"
              placeholder="Group Name"
              iconName={faUserGroup}
              styles="w-full px-0 mt-0"
              value={groupChatName}
              handleOnChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button
              type="text"
              title="Rename"
              styles="bg-[#91AA66] hover:scale-105 transition-transform active:scale-95 duration-300 w-1/3"
              onClick={handleGroupRename}
              isLoading={isRenameLoading}
            />
          </div>
          <FormField
            inputType="text"
            placeholder="Search Users to add ex. Ray"
            iconName={faSearch}
            styles="w-full "
            value={searchText}
            handleOnChange={handleChangeSearchText}
          />
        </div>
        <div className="flex flex-wrap gap-2 h-12 overflow-y-scroll overflow-x-hidden no-scrollbar w-10/12 my-2 transition-all duration-500 shadow-inner shadow-[#004351] rounded-md p-2">
          {selectedChat?.users
            ?.filter((u) => u._id !== user._id)
            .map((user) => (
              <SelectedUserBadge
                key={user._id}
                user={user}
                onClick={() => handleRemoveUser(user)}
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
          type="button"
          title="Leave Group"
          styles="bg-red-500 mt-4 !absolute bottom-4 hover:scale-105 transition-transform active:scale-95 duration-300"
          isLoading={isLoading}
          onClick={() => handleRemoveUser(user)}
        />
      </div>
    </div>
  );
};

export default GroupUpdatePopUp;
