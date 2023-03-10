import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeFromCart } from "../state/cart";

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);  
  console.log(cart);

  const deleteItemHandler=(id)=>{
    console.log(id)
    dispatch(removeFromCart(id))
  }

  return (
    <div className="cartContainer">
      {cart.map((item) => (
        <div className="cartViewWrapper">
          <img className="cartImg" src={item.background_image} alt="product" />
          <div className="cartInfoWrapper">
            <div className="cartInfoTop">
              <p className="cartTitle">{item.name}</p>
              <p className="cartPrice" onClick={()=> deleteItemHandler(item.id)}>
                $15.000 <FaTrash />
              </p>
            </div>
            <div className="cartInfoBottom">
              <p className="cartExtraInfo">Aca me imagino tags o alguna descripcion corta</p>
            </div>
          </div>
        </div>
      ))}
      <div className="cartCheckoutWrapper">
        <p className="cartCheckoutData">Checkout</p> 
        <p className="cartCheckoutData">Total: $ARS 45.000</p>
        <button className="cartCheckoutButton">Purchase</button>
      </div>
     
    </div>
  );
};

export default Cart;
