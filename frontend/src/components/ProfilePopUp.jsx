import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProfilePopUp = ({ setIsProfilePopUp, isProfilePopUp, user }) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsProfilePopUp(false);
    }
  };
  return (
    <div
      onClick={handleOutsideClick}
      className={`blurEffect z-10  flex h-screen w-screen items-center justify-center fixed top-0 left-0 ${
        isProfilePopUp
          ? "opacity-100 translate-y-0 transition-all duration-500 ease-in-out "
          : " opacity-0 -translate-y-full transition-all duration-500"
      }
      }`}
    >
      <div
        className={`z-40 relative flex flex-col items-center rounded-lg h-2/5 max-w-sm w-11/12  bg-[#002133] py-5 `}
      >
        <FontAwesomeIcon
          onClick={() => setIsProfilePopUp(false)}
          className="absolute right-5 text-2xl cursor-pointer  active:ring  px-3 py-2 rounded-lg hover:scale-105 hover:rotate-180 transition-transform active:scale-95 duration-300"
          icon={faXmark}
        />

        <div className="mt-10 h-32 w-32 rounded-full overflow-hidden">
          <img className="object-contain" src={user?.avatar} alt="avatar" />
        </div>
        <h2 className="text-2xl font-bold mt-1">{user?.name}</h2>
        <p className="text-slate-400 mt-2 text-lg">Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePopUp;
