import React from "react";

const FormField = ({ inputType, label, icon, id }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div>
        <img src={icon} alt={icon} />
        <input type={inputType} id={id} />
      </div>
    </>
  );
};

export default FormField;
