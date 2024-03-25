import React from "react";

const SearchUserShimmer = () => {
  return (
    <>
      {[...Array(15)].map((_, index) => (
        <div
          key={index}
          className="bg-[#006761] mt-2 h-12 rounded-md animate-pulse"
        ></div>
      ))}
    </>
  );
};

export default SearchUserShimmer;
