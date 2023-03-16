import React from "react";
import { useSelector } from "react-redux";

const History = () => {
  //States
  const user = useSelector((state) => state.user);
  const shoppedProducts = useSelector((state) => state.shoppedProducts);
  
  return (
    <div className="cartContainer">
      <h1 className="HistoryTitle">{user.name}´ history</h1>
      {shoppedProducts.map((item) => (
        <div className="cartViewWrapper">
          <img className="cartImg" src={item.background_image} alt="product" />
          <div className="cartInfoWrapper">
            <div className="cartInfoTop">
              <p className="cartTitle">{item.name}</p>
              <p className="cartPrice" >
                $15.000 
              </p>
            </div>
            <div className="cartInfoBottom">
              <p className="cartExtraInfo">
                Aca me imagino tags o alguna descripcion corta
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
