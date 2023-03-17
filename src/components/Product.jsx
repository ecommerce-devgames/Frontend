import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import stringGenerator from "../utils/stringGenerator";
import { setCart } from "../state/cart";
import { setGames } from "../state/games";
import { setReviews } from "../state/reviews";
import { TextField } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import ProductData from "../commons/ProductData.jsx";
import ProductRating from "../commons/ProductRating";
import MyProductRating from "../commons/MyProductRating";

const Product = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //States
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const reviews = useSelector((state) => state.reviews);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReviews, setSelectedReviews] = useState([]);

  //Variables
  const developerString = stringGenerator(product.developers);
  const platformString = stringGenerator(product.platforms);
  const genreString = stringGenerator(product.genres);
  const tagString = product.tags.join(", ");

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
      if (user.id) {
        axios
          .post(
            `http://localhost:3001/api/cart/addItem/${user.id}/${product.id}`,
            {},
            { withCredentials: true }
          )
          .then((res) => console.log(res));
      }
    }
  };

  const handleAdminNavigate = (item) => {
    setAnchorEl(null);
    navigate(`/edit/products/${item.id}`);
  };

  const handleAdminDeleteProduct = (item) => {
    setAnchorEl(null);
    console.log(item.id);
    axios
      .delete(`http://localhost:3001/api/games/admin/delete/${item.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        axios.get("http://localhost:3001/api/games").then((res) => {
          dispatch(setGames(res.data));
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mainConteiner">
      <div className="upperConteiner">
        <div className="productImage">
          <img src={product.poster} alt="game" />
        </div>
        <div className="lowerWrapper">
          <div className="productTitleRating">
            <h2 className="productTitle">{product.name}</h2>
            <ProductRating className="productRating" />
          </div>
          <p className="productDescription">{product.description}</p>
          <div className="productReviewsRating">
            <p className="productReviewsTitle">
              1910 reviews.
              <span>Show reviews</span>
            </p>
            <div className="poductMyRates">
              <p>Your Rate:</p>
              <MyProductRating />
            </div>
          </div>
          <div className="productUsersReviews">
            <p className="usersReviewsDetails">
              <span>Francisco García</span> (mail@mail.com), 18/07/2018:
            </p>
            <p className="usersReviewsContent">
              Acá iría el contenido de una review,
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
            </p>
          </div>

          <form className="textFieldForm">
            <TextField
              className="productTextField"
              id="outlined-size-normal"
              label="Your review"
              color="primary"
              focused
              multiline
              placeholder="Add a review..."
              sx={{
                "& .MuiOutlinedInput-input": {
                  color: "#fff",
                },
              }}
            />
            <button className="textFieldButton" type="submit">
              Send
            </button>
          </form>
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
            {user.isAdmin ? (
              <>
                <button
                  className="productButton"
                  onClick={() => handleAdminNavigate(product)}
                >
                  Edit
                </button>
                <button
                  className="productButton"
                  onClick={() => handleAdminDeleteProduct(product)}
                >
                  Delete
                </button>
              </>
            ) : (
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
