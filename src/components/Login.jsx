import React from "react";
import useInput from "../hooks/useInput";
import Input from "../commons/Input";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useInput();
  const password = useInput();

  return (
    <div className="loginConteiner">
      <form className="loginForm">
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
