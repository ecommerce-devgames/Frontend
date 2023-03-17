import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import stringGenerator from "../utils/stringGenerator";
import { setCart } from "../state/cart";
import { setGames } from "../state/games";
import { setReviews } from "../state/reviews";
import { TextField, Rating } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import ProductData from "../commons/ProductData.jsx";
import ProductRating from "../commons/ProductRating";
import MyProductRating from "../commons/MyProductRating";
import useInput from "../hooks/useInput";
import { useEffect } from "react";
import average, { setAverage } from "../state/average";

const Product = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useInput();
  const ratingValue = useInput();
  const ratingValueGiven = useInput();

  //States
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const average = useSelector((state) => state.average);
  const reviews = useSelector((state) => state.reviews);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const addToCartHandler = async () => {
    try {
      const validate = cart.some((el) => el.id === product.id);
      if (!validate) {
        dispatch(setCart(product));
        if (user.id) {
          const addToCart = await axios.post(
            `http://localhost:3001/api/cart/addItem/${user.id}/${product.id}`,
            {},
            { withCredentials: true }
          );
        }
      }
    } catch (error) {
      alert("Couldn't add to cart");
    }
  };

  const handleAdminNavigate = (item) => {
    setAnchorEl(null);
    navigate(`/edit/products/${item.id}`);
  };

  const handleAdminDeleteProduct = async (item) => {
    try {
      setAnchorEl(null);
      const deletedGame = await axios.delete(
        `http://localhost:3001/api/games/admin/delete/${item.id}`,
        {
          withCredentials: true,
        }
      );

      const resetGames = await axios
        .get("http://localhost:3001/api/games")
        .then((res) => {
          dispatch(setGames(res.data));
        });        
      navigate("/");
    } catch (error) {
      alert("Couldn't delete game");
    }
  };

  const showReviewsHandler = () => {
    axios.get(`http://localhost:3001/api/review/${product.id}`).then((res) => {
      console.log("revieewwsss", res.data);
      dispatch(setReviews(res.data));
    });
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/review/${product.id}/${user.id}`, {
        content: content.value,
        rating: ratingValue.value,
      })
      .then((res) => {
        console.log("mi review es", res.data);
        content.value = "";
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/review/${product.id}`).then((res) => {
      const averageArray = res.data.map((review) => review.rating);
      const average =
        averageArray.reduce((acc, num) => (acc += num)) / averageArray.length;
      console.log("averageArray", averageArray);
      console.log("average", average);
      dispatch(setAverage(average));
    });
  }, []);

  return (
    <div className="mainConteiner">
      <div className="upperConteiner">
        <div className="productImage">
          <img src={product.poster} alt="game" />
        </div>
        <div className="lowerWrapper">
          <div className="productTitleRating">
            <h2 className="productTitle">{product.name}</h2>
            <Rating
              className="productRating"
              value={average}
              precision={0.5}
              readOnly
              size="large"
            />
          </div>
          <p className="productDescription">{product.description}</p>
          <div className="productReviewsRating">
            <p className="productReviewsTitle">
              1910 reviews.
              <span onClick={showReviewsHandler}>Show reviews</span>
            </p>
          </div>
          {reviews.length ? (
            reviews.map((review) => (
              <div className="productUsersReviews">
                <p className="usersReviewsDetails">
                  <span>
                    {review.user.name} {review.user.lastName}
                  </span>
                  :
                </p>
                <p className="usersReviewsContent">{review.content}</p>
                <p className="usersReviewsContent">
                  Rate given: {review.rating}
                </p>
              </div>
            ))
          ) : (
            <p className="noReviews"> There are no reviews for this game.</p>
          )}

          <form className="textFieldForm" onSubmit={reviewSubmitHandler}>
            <TextField
              className="productTextField"
              color="primary"
              focused
              multiline
              required
              placeholder="your review..."
              sx={{
                "& .MuiOutlinedInput-input": {
                  color: "#fff",
                },
              }}
              id="outlined-controlled"
              label="Add a review and a rate"
              {...content}
            />
            <div className="poductMyRates">
              <p>Rate:</p>
              <Rating required {...ratingValue} precision={0.5} size="small" />
            </div>
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
