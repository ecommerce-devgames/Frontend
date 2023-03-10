import React from "react";
import { FaCheck, FaStar } from "react-icons/fa";

const Card = ({ item, singleProductHandler, addToCartHandler, cart, user }) => {
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
          <span className="cardRanking">
            {item.rating_top}
            <FaStar />
          </span>
        </div>
        <div className="cardSubcontainerB">
          {user?.isAdmin ? null : (
            <button
              className="cardButton"
              onClick={() => addToCartHandler(item)}
            >
              {cart.some((el) => el.id === item.id) ? (
                <FaCheck />
              ) : (
                "Add to cart"
              )}
            </button>          )}

          <p className="cardCart">15.000$</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
