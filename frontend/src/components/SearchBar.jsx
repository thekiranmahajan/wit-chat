import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SearchBar = ({ placeholder, onClick, searchText, setSearchText }) => {
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="h-10 w-11/12 rounded-md flex items-center px-4 bg-[#004351] overflow-hidden">
      <input
        placeholder={placeholder}
        className="bg-transparent outline-none border-none w-full py-1 px-2 truncate placeholder:text-sm"
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <FontAwesomeIcon onClick={onClick} icon={faMagnifyingGlass} />
    </div>
  );
};

export default SearchBar;
