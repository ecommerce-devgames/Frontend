import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import Dropdown from "../commons/Dropdown";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="logoWrapper">
        <Link to="/">
          <h4 className="navbarLogo">DevGames3</h4>
        </Link>
      </div>
      <div className="searchBarWrapper"></div>
      <div className="navigationWrapper">
        <Searchbar />
        <Dropdown />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
