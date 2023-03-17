import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Searchbar from "./Searchbar";
import Dropdown from "../components/Dropdown";
import UserAvatar from "./UserAvatar";
import NavbarResponsive from "./NavbarResponsive";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  //Hooks
  const navigate = useNavigate();

  //States
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user)

  //Handlers and functions
  const cartNavigationHandler = () => {
    navigate("/cart");
  };

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
          {user?.isAdmin ? null : (
            <div className="cartWrapper" onClick={cartNavigationHandler}>
              <FaShoppingCart className="cartIcon" />
              <span className="cartCount">{cart.length}</span>
            </div>
          )}
        </Link>
        <UserAvatar />
        <NavbarResponsive />
      </div>
    </div>
  );
};

export default Navbar;
