import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import Input from "../commons/Input";

const Settings = () => {
  //States
  const user = useSelector((state) => state.user);

  //Hooks
  const navigate = useNavigate();
  const name = useInput();
  const lastName = useInput();
  const email = useInput();
  const password = useInput();

  //Handlers and functions
  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .put(
        "http://localhost:3001/api/user/me/edit",
        verifyData({
          name: name.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
        }),
        { withCredentials: true }
      )
      .then(() => {
        alert("Updated successfuly");
        navigate("/");
      });
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

  return (
    <div style={{ marginTop: "15vh" }}>
      <form className="registerForm" onSubmit={onSubmitHandler}>
        <h3 className="registerTitle">Update your personal info</h3>
        <Input
          name="name"
          type="text"
          placeholder="New name"
          valueHandler={name}
        />
        <Input
          name="lastname"
          type="text"
          placeholder="New last name"
          valueHandler={lastName}
        />
        <Input
          name="email"
          type="email"
          placeholder="New email"
          valueHandler={email}
        />
        <Input
          name="password"
          type="password"
          placeholder="New password"
          valueHandler={password}
        />
        <button className="registerButton" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Settings;
