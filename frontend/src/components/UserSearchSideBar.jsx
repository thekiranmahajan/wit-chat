import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import UserSearchShimmer from "./UserSearchShimmer";
import SearchedUserCard from "./SearchedUserCard";
import { ChatState } from "../context/ChatProvider";
const UserSearchSideBar = ({ isSidebar, setIsSidebar }) => {
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [isUsersLoading, setIsUsersloading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSearch = async () => {
    setIsUsersloading(true);
    if (!searchText) {
      toast.warn("Please add name or email to search", {
        theme: "dark",
      });
      setIsUsersloading(false);
      return;
    }

    try {
      const config = {
        headers: { authorization: `Bearer ${user?.token}` },
      };

      const { data } = await axios.get(
        `/api/user?search=${searchText}`,
        config
      );
      setSearchedUsers(data);
      setIsUsersloading(false);
    } catch (error) {
      toast.error("Something went wrong while search", {
        theme: "dark",
      });
      setIsUsersloading(false);
    }
  };
  const clearSearch = () => {
    setSearchText("");
    setSearchedUsers(null);
    selectedUserId(null);
  };

  const handleAccessChat = async (userId) => {
    setSelectedUserId(userId);
    try {
      setIsChatLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((chat) => chat._id)) setChats([data, ...chats]);

      setIsChatLoading(false);
      setSelectedChat(data);
      setIsSidebar(false);
    } catch (error) {
      toast.error("Failed to add a chat", {
        theme: "dark",
      });
      setSearchedUsers(null);
      setIsChatLoading(false);
    }
  };
  return (
    <div
      className={`blurEffect h-full  w-11/12 max-w-sm flex items-center flex-col p-5 z-10 absolute transition-all duration-300 ${
        isSidebar
          ? "opacity-100 translate-x-0 transition-all duration-500 ease-in-out "
          : " opacity-0 -translate-x-full transition-all duration-500"
      }`}
    >
      <div className="flex items-center justify-between w-full mb-4 sm:pl-5 pl-3">
        <h2 className="font-extrabold text-xl ">Search a User</h2>
        <FontAwesomeIcon
          onClick={() => setIsSidebar(false)}
          className="text-xl cursor-pointer hover:scale-105 transition-transform active:scale-95 duration-300"
          icon={faArrowLeft}
        />
      </div>
      <SearchBar
        placeholder="Search by Name or Email"
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
      <div className="w-full h-full overflow-y-scroll overflow-x-hidden mt-2 no-scrollbar p-4 flex flex-col scroll-smooth">
        <p className="text-sm sm:text-base ml-4 flex w-full">Results: </p>
        {isUsersLoading ? (
          <UserSearchShimmer noOfTimes={12} />
        ) : (
          searchedUsers && (
            <div className="flex flex-col items-center justify-center w-full">
              {searchedUsers.length === 0 && (
                <p className="font-bold ml-4 mt-2">
                  No Users found with given name or email.
                </p>
              )}
              {searchedUsers?.length !== 0 &&
                searchedUsers?.map((searchedUser) => (
                  <SearchedUserCard
                    key={searchedUser?._id}
                    {...searchedUser}
                    handleClick={() => handleAccessChat(searchedUser?._id)}
                    isChatLoading={
                      isChatLoading && searchedUser?._id === selectedUserId
                    }
                  />
                ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserSearchSideBar;
