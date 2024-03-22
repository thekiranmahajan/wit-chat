import React, { useState } from "react";
import SearchBar from "./SearchBar";

const SideSearchDrawer = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="blurEffect h-full sm:w-96 w-4/5  flex items-center flex-col p-5 z-10 absolute">
      <h2 className="font-extrabold text-xl mb-4">Search a Friend</h2>
      <SearchBar
        placeholder="Search by Name or Email"
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </div>
  );
};

export default SideSearchDrawer;
