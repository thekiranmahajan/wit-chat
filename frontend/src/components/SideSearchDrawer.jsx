import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
const SideSearchDrawer = ({ isSearchClicked, setIsSearchClicked, user }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState("");

  const handleSearch = async () => {
    console.log(searchText);
    if (!searchText) {
      toast.warn("Please add name or email to search", {
        theme: "dark",
      });
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
    } catch (error) {
      toast.error("Something went wrong while search", {
        theme: "dark",
      });
    }
  };

  return (
    <div
      className={`blurEffect h-full sm:w-96 w-4/5  flex items-center flex-col p-5 z-10 absolute transition-all duration-300 ${
        isSearchClicked
          ? "opacity-100 translate-x-0 transition-all duration-500 ease-in-out "
          : " opacity-0 -translate-x-full transition-all duration-300"
      }`}
    >
      <div className="flex items-center justify-between w-full mb-4 sm:pl-5 pl-3">
        <h2 className="font-extrabold text-xl ">Search a Friend</h2>
        <FontAwesomeIcon
          onClick={() => setIsSearchClicked((prev) => !prev)}
          className="text-xl cursor-pointer hover:scale-105 transition-transform active:scale-95 duration-300"
          icon={faArrowLeft}
        />
      </div>
      <SearchBar
        placeholder="Search by Name or Email"
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default SideSearchDrawer;
