import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setProduct } from "../state/product";
import { setCart } from "../state/cart";
import { setGames } from "../state/games";
import Card from "../commons/Card";
import Grid from "@mui/material/Grid";

const GridView = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //States
  const games = useSelector((state) => state.games);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);

  //Variables
  const open = Boolean(anchorEl);

  //Handlers and functions
  useEffect(() => {
    axios
      .get(
        "https://api.rawg.io/api/games?key=679adbda4ffc4cd5a68fad9b1e98f040&dates=2019-09-01,2019-09-30&platforms=18,1,7"
      )
      .then((res) => dispatch(setGames(res.data.results)));
    // eslint-disable-next-line
  }, []);

  const singleProductHandler = (item) => {
    axios
      .get(
        `https://api.rawg.io/api/games/${item.id}?key=679adbda4ffc4cd5a68fad9b1e98f040&dates=2019-09-01,2019-09-30&platforms=18,1,7`
      )
      .then((res) => {
        console.log("producto", res.data);
        dispatch(setProduct(res.data));
        localStorage.setItem("singleProduct", JSON.stringify(res.data));
        navigate(`/products/${res.data.id}`);
      });
  };

  const addToCartHandler = (item) => {
    const validate = cart.some((el) => el.id === item.id);
    if (!validate) {
      axios
        .get(
          `https://api.rawg.io/api/games/${item.id}?key=679adbda4ffc4cd5a68fad9b1e98f040&dates=2019-09-01,2019-09-30&platforms=18,1,7`
        )
        .then((res) => {
          dispatch(setCart(res.data));
        });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    anchorEl === event.currentTarget ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  };

  const handleAdminNavigate = (item) => {
    setAnchorEl(null);
    navigate(`/edit/products/${item.id}`);
  };

  const handleAdminDeleteProduct = (item) => {
    setAnchorEl(null);
    axios
      .delete(`http://localhost:3001/api/games/admin/delete/${item.id}`)
      .then((res) => console.log(res));
  };

  localStorage.setItem("cart", JSON.stringify(cart));

  if (!games) return <h5>No content</h5>;
  return (
    <div className="gridContainer">
      <h2 className="gridTitle">Games</h2>
      <Grid container rowSpacing={6} columnSpacing={5}>
        {games.map((game) => {
          return (
            <Grid key={game.id}item s={12} sm={6} md={6} lg={6} xl={3}>
              <Card                
                item={game}
                cart={cart}
                user={user}
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                singleProductHandler={singleProductHandler}
                addToCartHandler={addToCartHandler}
                handleClose = {handleClose}
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
