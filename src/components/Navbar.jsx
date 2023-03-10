import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import Dropdown from "../commons/Dropdown";
import UserAvatar from "./UserAvatar";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const cartNavigationHandler=()=>{
    navigate("/cart")
  }

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
        <Link to="/cart">
          <div className="cartWrapper" onClick={cartNavigationHandler}>
            <FaShoppingCart className="cartIcon" />
            <span className="cartCount">3</span>
          </div>
        </Link>
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
