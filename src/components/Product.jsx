import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useStringGenerator from "../hooks/useStringGenerator";
import { useNavigate } from "react-router";
import { setCart } from "../state/cart";
import ProductData from "../commons/ProductData.jsx";
import { FaCheck } from "react-icons/fa";

const Product = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //States
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  //Variables
  //para product.developers. Nos tiene que llegar un array de strings
  // const developersString = products.developers.join(" ")
  const developerString = useStringGenerator(product.developers);
  const platformString = useStringGenerator(product.platforms);
  const genreString = useStringGenerator(product.genres);
  const tagString = useStringGenerator(product.tags);

  //Handlers and functions
  const buyHandler = () => {
    const validate = cart.some((el) => el.id === product.id);
    if (user && !validate) {
      dispatch(setCart(product));
    }
    navigate(user ? "/cart" : "/login");
  };

  const addToCartHandler = () => {
    const validate = cart.some((el) => el.id === product.id);
    if (!validate) {
      dispatch(setCart(product));
    }
  };

  localStorage.setItem("cart", JSON.stringify(cart));

  return (
    <div className="mainConteiner">
      <div className="upperConteiner">
        <div className="productImage">
          <img src={product.background_image} alt="game" />
        </div>
        <div className="lowerWrapper">
          <h2 className="productTitle">{product.name}</h2>
          <p className="productDescription">{product.description_raw}</p>
        </div>
      </div>

      <div className="lowerConteiner">
        <div className="productSidebar">
          <div className="productDataSheet">
            <ProductData title="Release Date" info={product.released} />
            <ProductData title="Developers" info={developerString} />
            <ProductData title="Playtime" info={product.playtime} />
            <ProductData title="Platforms" info={platformString} />
            <ProductData title="Genres" info={genreString} />
            <ProductData title="Tags" info={tagString} />
          </div>

          <div className="productButtonsWrapper">
            {user.isAdmin ? null : (
              <>
                <button className="productButton" onClick={buyHandler}>
                  Buy
                </button>
                <button className="productButton" onClick={addToCartHandler}>
                  {cart.some((el) => el.id === product.id) ? (
                    <FaCheck />
                  ) : (
                    "Add to cart"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
