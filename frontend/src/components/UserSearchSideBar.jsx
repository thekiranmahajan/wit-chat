import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { faArrowLeft, faL } from "@fortawesome/free-solid-svg-icons";
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
  const [isLoadingChat, setIsloadingChat] = useState(false);

  const handleSearch = async () => {
    console.log(searchText);
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
      console.log(data);
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
    setSearchedUsers([]);
  };

  const handleAccessChat = async (userId) => {
    try {
      setIsloadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      setIsloadingChat(false);
      setSelectedChat(data);
      setIsSidebar(false);
    } catch (error) {
      toast.error("Failed to add a chat", {
        theme: "dark",
      });
      setIsloadingChat(false);
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
      <div className="w-full h-full overflow-y-scroll overflow-x-hidden mt-4 no-scrollbar p-4 flex flex-col scroll-smooth">
        <p className="text-sm ml-4 flex w-full">Results: </p>
        {isUsersLoading ? (
          <UserSearchShimmer />
        ) : (
          searchedUsers && (
            <>
              {searchedUsers.map((searchedUser) => (
                <SearchedUserCard
                  key={searchedUser._id}
                  {...searchedUser}
                  handleAccessChat={() => handleAccessChat(searchedUser._id)}
                />
              ))}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default UserSearchSideBar;
