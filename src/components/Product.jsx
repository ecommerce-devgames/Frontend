import React from "react";
import { useSelector } from "react-redux";
import useStringGenerator from "../hooks/useStringGenerator";

const Product = () => {
  const product = useSelector((state) => state.product);
  //para product.developers. Nos tiene que llegar un array de strings
  // const developersString = products.developers.join(" ")
  const developerString = useStringGenerator(product.developers);
  console.log(product);
  const platformString = useStringGenerator(product.platforms);
  const genreString = useStringGenerator(product.genres);
  const tagString = useStringGenerator(product.tags);

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
            <div className="productData">
              <p>Release Date: </p>
              <span className="productSpan">{product.released}</span>
            </div>
            <div className="productData">
              <p>Developers:</p>
              <span className="productSpan">{developerString}</span>
            </div>
            <div className="productData">
              <p>Playtime:</p>
              <span className="productSpan">{product.playtime}</span>
            </div>
            <div className="productData">
              <p>Platforms:</p>
              <span className="productSpan">{platformString}</span>
            </div>
            <div className="productData">
              <p>Genres:</p>
              <span className="productSpan">{genreString}</span>
            </div>
            <div className="productData">
              <p>Tags:</p>
              <span className="productSpan">{tagString}</span>
            </div>
          </div>
          {/* botones  */}
          <div className="productButtonsWrapper">
            <button className="productButton">Buy</button>
            <button className="productButton">Add to cart</button>
          </div>
        </div>
      </div>

      <div className="lowerConteiner">
        {/* lower div, con titulo, descripcion y tags y genres*/}
        <h2 className="productTitle">{product.name}</h2>

        <p className="productDescription">{product.description_raw}</p>
      </div>
    </div>
  );
};

export default Product;
