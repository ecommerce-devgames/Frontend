import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setUser } from "../state/user";
import { importCartFromDb, importCartFromLs } from "../state/cart";
import Input from "../commons/Input";

const Login = () => {
  //Hooks
  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //States
  const cart = useSelector((state) => state.cart);

  //Handlers and functions
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/user/login",
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setUser(res.data));
        axios
          .get(`/api/cart/${res.data.id}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.length) return dispatch(importCartFromDb(res.data));
            dispatch(
              importCartFromLs(JSON.parse(localStorage.getItem("cart")))
            );
          });
        navigate("/");
      });
  };

  return (
    <div className="loginConteiner">
      <form className="loginForm" onSubmit={onSubmitHandler}>
        <h3 className="registerTitle">Login</h3>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          valueHandler={email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          valueHandler={password}
        />
        <button className="registerButton" type="submit">
          Submit
        </button>
        <div className="registerAlreadyAccount">
          <p>First time in DevGames3?</p>
          <Link className="registerLink" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
