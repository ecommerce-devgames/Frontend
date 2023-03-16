import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeFromCart, setCart, removeAllItems } from "../state/cart";
import { setShoppedProducts } from "../state/shoppedProducts";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //States
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  //Handlers
  const deleteItemHandler = (item) => {
    dispatch(removeFromCart(item));
    if (user.id) {
      axios
        .post(
          `http://localhost:3001/api/cart/removeItem/${user.id}/${item.id}`,
          {},
          { withCredentials: true }
        )
        .then((res) => console.log(res));
    }
  };
  
  const purchaseHandler = () => {
    if (!user.name) return navigate("/login");

    dispatch(setShoppedProducts(cart));
    if (user.id) {
      axios
        .post(
          `http://localhost:3001/api/cart/purchase/${user.id}`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          dispatch(removeAllItems([]));
        });
    }
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
                $US {item.price} <FaTrash className="trash" />
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
          <h2 className="noGamesTitle">Your cart is empty</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
