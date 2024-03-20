import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormField = ({
  inputType,
  label,
  iconName,
  id,
  placeholder,
  isRequired,
  isFileInput,
  onChange,
}) => {
  return (
    <div className="px-4 mt-2 flex flex-col gap-1 ">
      <label className="font-semibold" htmlFor={id}>
        {label} {isRequired && <sup className="text-red-500 text-base">*</sup>}
      </label>

      <div className="h-10 rounded-md flex items-center px-4 bg-[#312C4F] overflow-hidden">
        <FontAwesomeIcon className="sm:text-xl text-lg" icon={iconName} />
        <input
          className={`bg-transparent outline-none border-none w-full p-4 truncate placeholder:text-sm ${
            isFileInput &&
            "file:h-full file:bg-[#0C1C30] file:text-white file:rounded-md file:shadow-none py-0 h-full"
          }`}
          type={inputType}
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          accept={isFileInput ? "image/*" : ""}
        />
      </div>
    </div>
  );
};

export default FormField;
