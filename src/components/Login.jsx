import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setUser } from "../state/user";
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
        "http://localhost:3001/api/user/login",
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setUser(res.data));
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
