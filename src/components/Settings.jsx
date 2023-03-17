import React, { useState } from "react";

import useInput from "../hooks/useInput";

import { useSelector } from "react-redux";

import axios from "axios";
const Settings = () => {
  const name = useInput();
  const lastName = useInput();
  const email = useInput();
  const password = useInput();

  const verifyPassword = (e) => {
    e.preventDefault();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios.put(
      "http://localhost:3001/api/user/me/edit",
      verifyData({
        name: name.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      }),

      { withCredentials: true }
    );
  };

  const verifyData = (data) => {
    const dataV = {};
    for (const verifierD in data) {
      if (data[verifierD]) {
        dataV[verifierD] = data[verifierD];
      }
    }
    return dataV;
  };

  const user = useSelector((state) => state.user);

  console.log(user);

  return (
    <div className="editCategoiresForm">
      <form className="loginForm" onSubmit={onSubmitHandler}>
        <label>
          your name is {user.name} dearly player
          <input
            className="registerInput"
            onChange={(e) => {
              name.value = e.target.value;
            }}
          ></input>
        </label>

        <label>
          your player lastName is {user.lastName}
          <input
            className="registerInput"
            onChange={(e) => {
              lastName.value = e.target.value;
            }}
          ></input>
        </label>
        <label>
          your player e email is {user.email}
          <input
            className="registerInput"
            onChange={(e) => {
              email.value = e.target.value;
            }}
          ></input>
        </label>
        <label>
          {" "}
          change your player passowrd!
          <input
            className="registerInput"
            onChange={(e) => (password.value = e.target.value)}
          ></input>
        </label>

        <button className="registerButton" type="submit">
          {" "}
          Change!
        </button>
      </form>
    </div>
  );
};

export default Settings;
