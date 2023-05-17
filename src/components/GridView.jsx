import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setProduct } from "../state/product";
import { setCart } from "../state/cart";
import { setGames } from "../state/games";
import Card from "../commons/Card";
import Grid from "@mui/material/Grid";

const GridView = () => {
  //Hooks
  const location = useLocation();
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //States
  const games = useSelector((state) => state.games);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const query = useSelector((state) => state.searchQuery);
  const [anchorEl, setAnchorEl] = useState(null);

  //Variables
  const open = Boolean(anchorEl);
  const pathname = location.pathname.split("/")[1];
  console.log("pathname ==>>", pathname);

  //Handlers and functions
  useEffect(() => {
    if (pathname === "") {
      axios.get("/api/games").then((res) => {
        console.log("games ==>>", res.data);
        dispatch(setGames(res.data));
      });
    }
    if (pathname === "search") {
      axios
        .get(`/api/games/search?name=${query}`, {
          withCredentials: true,
        })
        .then((result) => {
          dispatch(setGames(result.data));
        });
    }
    if (pathname === "category") {
      axios
        .get(`/api/games/category/${category}`, {
          withCredentials: true,
        })
        .then((result) => {
          dispatch(setGames(result.data));
        });
    }
  }, [pathname, category, query]);

  const singleProductHandler = async (item) => {
    try {
      const singleProduct = await axios.get(`/api/games/${item.id}`);
      dispatch(setProduct(singleProduct.data));
      localStorage.setItem("singleProduct", JSON.stringify(singleProduct.data));
      navigate(`/products/${singleProduct.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartHandler = async (item) => {
    try {
      const validate = cart.some((el) => el.id === item.id);
      if (!validate) {
        const gameToAdd = await axios.get(`/api/games/${item.id}`);

        dispatch(setCart(gameToAdd.data));

        if (user.id) {
          const addedToDb = await axios.post(
            `/api/cart/addItem/${user.id}/${item.id}`,
            {},
            { withCredentials: true }
          );
        }
      }
    } catch (error) {
      alert("Couldn't add game to cart");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    anchorEl === event.currentTarget
      ? setAnchorEl(null)
      : setAnchorEl(event.currentTarget);
  };

  const handleAdminNavigate = (id) => {
    setAnchorEl(null);
    navigate(`/edit/products/${id}`);
  };

  const handleAdminDeleteProduct = async (id) => {
    try {
      setAnchorEl(null);

      const deleteGameAsAdmin = await axios.delete(
        `/api/games/admin/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      const resetGames = await axios.get("/api/games").then((res) => {
        dispatch(setGames(res.data));
      });

      navigate("/");
    } catch (error) {
      alert("Couldn't delete game");
    }
  };

  return (
    <div className="gridContainer">
      <h2 className="gridTitle">
        {games && games[0] ? "Games" : "No games found for this category"}
      </h2>
      {category ? <h2 className="gridSubtitle">{category}</h2> : null}
      <Grid container rowSpacing={6} columnSpacing={5}>
        {games.map((game) => {
          return (
            <Grid key={game.id} item s={12} sm={6} md={6} lg={6} xl={3}>
              <Card
                singleGame={game}
                cart={cart}
                user={user}
                open={open}
                anchorEl={anchorEl}
                singleProductHandler={singleProductHandler}
                addToCartHandler={addToCartHandler}
                handleClose={handleClose}
                handleClick={handleClick}
                handleAdminNavigate={handleAdminNavigate}
                handleAdminDeleteProduct={handleAdminDeleteProduct}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default GridView;
