import React from "react";
import Input from "../commons/Input";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";

const Register = () => {
  const name = useInput();
  const lastname = useInput();
  const email = useInput();
  const password = useInput();

  return (
    <div className="registerConteiner">
      <form className="registerForm">
        <h3 className="registerTitle">Register</h3>
        <Input name="name" type="text" placeholder="Name" valueHandler={name} />
        <Input
          name="lastname"
          type="text"
          placeholder="Last name"
          valueHandler={lastname}
        />
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
          <p>Do you already have an account? </p>
          <Link className="registerLink" to="/login">Back to login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
