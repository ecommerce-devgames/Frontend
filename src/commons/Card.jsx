import React from "react";
import AdminCardBtns from "../commons/AdminCardBtns";
import { FaCheck, FaStar } from "react-icons/fa";

const Card = ({
  item,
  singleProductHandler,
  addToCartHandler,
  cart,
  user,
  open,
  anchorEl,
  setAnchorEl,
  handleClick,
  handleAdminNavigate,
  handleAdminDeleteProduct,
}) => {
  return (
    <div className="cardConteiner">
      <img
        className="gridImage"
        src={item.background_image}
        alt="product"
        onClick={() => singleProductHandler(item)}
      />

      <div className="cardContent">
        <div className="cardSubconteiner">
          <span className="cardTitle">{item.name}</span>
          {user?.isAdmin ? (
            <AdminCardBtns
              item={item}
              open={open}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleClick={handleClick}
              
              handleAdminNavigate={handleAdminNavigate}
              handleAdminDeleteProduct={handleAdminDeleteProduct}
            />
          ) : (
            <span className="cardRanking">
              {item.rating_top}
              <FaStar />
            </span>
          )}
        </div>
        <div className="cardSubcontainerB">
          {user?.isAdmin ? null : (
            <>
              {" "}
              <button
                className="cardButton"
                onClick={() => addToCartHandler(item)}
              >
                {cart.some((el) => el.id === item.id) ? (
                  <FaCheck />
                ) : (
                  "Add to cart"
                )}
              </button>
              <p className="cardCart">$USD 60</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
