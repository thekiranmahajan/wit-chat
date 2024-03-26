import React from "react";

const UserSearchShimmer = ({ noOfTimes }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {[...Array(noOfTimes)].map((_, index) => (
        <div
          key={index}
          className="bg-[#006761] mt-2 h-12 w-full rounded-md flex items-center p-3 gap-5 overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all animate-pulse"
        >
          <div className="bg-[#91AA66] sm:h-10 sm:w-10 h-8 w-8 rounded-full animate-pulse"></div>
          <div className="h-12 w-3/4 flex flex-col justify-center py-1 gap-1 animate-pulse">
            <p className="h-3 w-2/5 bg-[#4A8B65] rounded-lg"></p>
            <p className="h-2 w-3/4 bg-[#4A8B65] rounded-lg "></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSearchShimmer;
