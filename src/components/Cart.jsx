import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeFromCart, setCart } from "../state/cart";
import { setShoppedProducts } from "../state/shoppedProducts";
import { useNavigate } from "react-router";

const Cart = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //States
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  console.log(cart)
  //Handlers
  const deleteItemHandler = (item) => {
    dispatch(removeFromCart(item));
  };
  localStorage.setItem("cart", JSON.stringify(cart));

  const purchaseHandler = () => {
    //cambie el condicional del navigate para hacer el dispatch del estado para el historial
    !user.name ? navigate("/login") : dispatch(setShoppedProducts(cart));
    dispatch(setCart(""));
  };

  return (
    <div className="cartContainer">
      {cart.map((item) => (
        <div className="cartViewWrapper">
          <img className="cartImg" src={item.poster} alt="product" />
          <div className="cartInfoWrapper">
            <div className="cartInfoTop">
              <p className="cartTitle">{item.name}</p>
              <p className="cartPrice" onClick={() => deleteItemHandler(item)}>
                $US {item.price} <FaTrash className="trash"/>
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
          <button className="cartCheckoutButton" onClick={purchaseHandler}>
            Purchase
          </button>
        </div>
      ) : (
        <div className="cartNoGames">
          <h2 className="noGamesTitle">
            You didn't add anything to your cart yet
          </h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
