import { SpaOutlined } from "@mui/icons-material";
import React from "react";
import { FaShoppingCart, FaCheck, FaStar } from "react-icons/fa";

const Card = ({ item, singleProductHandler }) => {
  return (
    <div className="cardConteiner" onClick={singleProductHandler}>
      <img className="gridImage" src={item.background_image} />

      <div className="cardSubconteiner">
        <span className="cardTitle">{item.name}</span>
        <span className="cardRanking">
          {item.rating_top}
          <FaStar />
        </span>
      </div>

      <div>
        <span className="cardCart">15.000$</span>
        <button className="cardButton">Add to cart</button>
      </div>
    </div>
  );
};

export default Card;
