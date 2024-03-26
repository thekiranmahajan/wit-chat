import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SearchBar = ({
  placeholder,
  searchText,
  setSearchText,
  handleSearch,
  clearSearch,
}) => {
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative h-10 w-11/12 rounded-md flex items-center px-4 bg-[#004351] overflow-hidden transition-all duration-500">
      <input
        placeholder={placeholder}
        className="bg-transparent outline-none border-none w-full py-1 px-2 truncate placeholder:text-sm"
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleEnter}
        value={searchText}
      />
      {searchText && (
        <button
          className=" mr-2 text-xl text-gray-500 hover:text-gray-600 transition-colors"
          onClick={clearSearch}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <button
        className=" text-lg ml-2 text-gray-200 hover:text-gray-600 transition-colors"
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
