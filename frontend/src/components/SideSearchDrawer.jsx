import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { faArrowLeft, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import SearchUserShimmer from "./SearchUserShimmer";
import SearchUser from "./SearchUser";
const SideSearchDrawer = ({ isSidebar, setIsSidebar, user }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const handleSearch = async () => {
    console.log(searchText);
    setIsloading(true);
    if (!searchText) {
      toast.warn("Please add name or email to search", {
        theme: "dark",
      });
      setIsloading(false);
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
      setIsloading(false);
    } catch (error) {
      toast.error("Something went wrong while search", {
        theme: "dark",
      });
      setIsloading(false);
    }
  };
  const clearSearch = () => {
    setSearchText("");
    setSearchedUsers([]);
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
        <h2 className="font-extrabold text-xl ">Search a Friend</h2>
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
      <div className="w-full h-full overflow-y-scroll mt-4 scrollbar pr-3 pb-4">
        <p>Results: </p>
        {isLoading ? (
          <SearchUserShimmer />
        ) : (
          searchedUsers && (
            <>
              {searchedUsers.map((searchedUser) => (
                <SearchUser key={searchedUser._id} {...searchedUser} />
              ))}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default SideSearchDrawer;
