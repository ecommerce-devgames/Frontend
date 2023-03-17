import React from "react";

const Input = ({ type, name, placeholder, valueHandler }) => {
  return (
    <input
      className="registerInput"
      name={name}
      type={type}
      placeholder={placeholder}
      {...valueHandler}
      required
    />
  );
};

export default Input;

//
