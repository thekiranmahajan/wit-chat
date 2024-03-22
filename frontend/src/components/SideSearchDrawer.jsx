import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideSearchDrawer = ({ isSearchClicked, setIsSearchClicked }) => {
  const [searchText, setSearchText] = useState("");
  return (
    isSearchClicked && (
      <div className="blurEffect h-full sm:w-96 w-4/5  flex items-center flex-col p-5 z-10 absolute transition-all duration-300">
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
        />
      </div>
    )
  );
};

export default SideSearchDrawer;
