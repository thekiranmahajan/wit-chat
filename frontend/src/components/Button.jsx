import React from "react";
import { loader } from "../assets";

const Button = ({ type, isLoading, onClick, title, styles }) => {
  return (
    <button
      disabled={isLoading}
      type={type}
      onClick={onClick}
      className={`h-10  w-3/5 rounded-lg font-extrabold text-lg cursor-pointer flex items-center justify-center ${styles}`}
    >
      {isLoading ? <img className="h-6" src={loader} alt="loader" /> : title}
    </button>
  );
};

export default Button;
