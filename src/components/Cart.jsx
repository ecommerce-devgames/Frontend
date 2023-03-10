import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeFromCart, setCart } from "../state/cart";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  const DeleteItemHandler = (item) => {
    console.log(item, "soy el juego que eliminaste");
    dispatch(removeFromCart(item));
    console.log(cart);
  };

  return (
    <div className="cartContainer">
      {cart.map((item) => (
        <div className="cartViewWrapper">
          <img className="cartImg" src={item.background_image} alt="product" />
          <div className="cartInfoWrapper">
            <div className="cartInfoTop">
              <p className="cartTitle">{item.name}</p>
              <p className="cartPrice" onClick={() => DeleteItemHandler(item)}>
                $15.000 <FaTrash />
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
      {cart[0] ? (
        <div className="cartCheckoutWrapper">
          <p className="cartCheckoutData">Checkout</p>
          <p className="cartCheckoutData">Total: $USD 180</p>
          <button className="cartCheckoutButton">Purchase</button>
        </div>
      ) : (
        <div className="cartNotGames">
          <h2>there´s nothing on cart</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
