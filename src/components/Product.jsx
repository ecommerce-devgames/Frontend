import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useStringGenerator from "../hooks/useStringGenerator";
import { useNavigate } from "react-router";
import { setCart } from "../state/cart";
import ProductData from "../commons/ProductData.jsx";
import {FaCheck} from "react-icons/fa"

const Product = () => {
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //para product.developers. Nos tiene que llegar un array de strings
  // const developersString = products.developers.join(" ")
  const developerString = useStringGenerator(product.developers);
  const platformString = useStringGenerator(product.platforms);
  const genreString = useStringGenerator(product.genres);
  const tagString = useStringGenerator(product.tags);

  const buyHandler = () => {
    const validate = cart.some((el) => el.id === product.id);
    if (user && !validate) {
      dispatch(setCart(product));
    }
    navigate(user ? "/cart" : "/login");
  };

  const addToCartHandler = () => {
    const validate = cart.some((el) => el.id === product.id);
    if(!validate) dispatch(setCart(product));
  };

  console.log("CARTTTT", cart);
  return (
    <div className="mainConteiner">
      {/* upper div, imagen y ficha tecnica*/}
      <div className="upperConteiner">
        <div className="productImage">
          <img src={product.background_image} alt="game" />
        </div>
        <div className="productSidebar">
          {/* ficha técnica: developers, platforms, release day, playtime*/}
          <div className="productDataSheet">
            <ProductData title="Release Date" info={product.released} />
            <ProductData title="Developers" info={developerString} />
            <ProductData title="Playtime" info={product.playtime} />
            <ProductData title="Platforms" info={platformString} />
            <ProductData title="Genres" info={genreString} />
            <ProductData title="Tags" info={tagString} />
          </div>
          {/* botones  */}
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

      <div className="lowerConteiner">
        {/* lower div, con titulo, descripcion, tags y genres*/}
        <div className="lowerWrapper">
          <h2 className="productTitle">{product.name}</h2>
          <p className="productDescription">{product.description_raw}</p>
        </div>
        <div className="lowerFill"></div>
      </div>
    </div>
  );
};

export default Product;
