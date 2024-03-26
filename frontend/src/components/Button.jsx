import React from "react";
import { loader } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ type, isLoading, onClick, title, styles, iconName }) => {
  return (
    <button
      disabled={isLoading}
      type={type}
      onClick={onClick}
      className={`relative h-10  w-3/5 rounded-lg font-extrabold text-lg cursor-pointer flex items-center justify-center  ${styles}`}
    >
      {isLoading ? <img className="h-6" src={loader} alt="loader" /> : title}
      {iconName && (
        <FontAwesomeIcon
          className="ml-4 hover:scale-105 hover:rotate-180 transition-transform active:scale-95 duration-300"
          icon={iconName}
        />
      )}
    </button>
  );
};

export default Button;
