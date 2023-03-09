import { SpaOutlined } from "@mui/icons-material";
import React from "react";
import { FaShoppingCart, FaCheck, FaStar } from "react-icons/fa";

const Card = ({ item, singleProductHandler, addToCartHandler }) => {
  return (
    <div className="cardConteiner" onClick={() => singleProductHandler(item)}>
      <img className="gridImage" src={item.background_image} />

      <div className="cardContent">
        <div className="cardSubconteiner">
          <span className="cardTitle">{item.name}</span>
          <span className="cardRanking">
            {item.rating_top}
            <FaStar />
          </span>
        </div>
        <div className="cardSubcontainerB">
          <button className="cardButton" onClick={() => addToCartHandler(item)}>
            Add to cart
          </button>
          <p className="cardCart">15.000$</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
