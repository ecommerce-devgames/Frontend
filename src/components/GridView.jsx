import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../commons/Card";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../state/product";
import { useNavigate } from "react-router";
import { setCart } from "../state/cart";

const GridView = () => {
  const [data, setData] = useState([]);
  const cart = useSelector(state=> state.cart);
  const user = useSelector(state=> state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://api.rawg.io/api/games?key=679adbda4ffc4cd5a68fad9b1e98f040&dates=2019-09-01,2019-09-30&platforms=18,1,7"
      )
      .then((res) => setData(res.data.results));
  }, []);

  const singleProductHandler = (item) => {
    axios
      .get(
        `https://api.rawg.io/api/games/${item.id}?key=679adbda4ffc4cd5a68fad9b1e98f040&dates=2019-09-01,2019-09-30&platforms=18,1,7`
      )
      .then((res) => {
        dispatch(setProduct(res.data));
        localStorage.setItem("singleProduct", JSON.stringify(res.data))
        navigate(`/products/${res.data.id}`);
      });
  };

  const addToCartHandler = (item) => {
    axios
      .get(
        `https://api.rawg.io/api/games/${item.id}?key=679adbda4ffc4cd5a68fad9b1e98f040&dates=2019-09-01,2019-09-30&platforms=18,1,7`
      )
      .then((res) => {
        dispatch(setCart(res.data));
      });
  };

  console.log(data);
  if (!data) return <h5>No content</h5>;
  return (
    <div className="gridContainer">
      <h2 className="gridTitle">Games</h2>
      <Grid container rowSpacing={6} columnSpacing={5}>
        {data.map((item) => {
          return (
            <Grid item s={12} sm={6} md={6} lg={6} xl={3}>
              <Card
                key={item.id}
                item={item}
                cart={cart}
                user={user}
                singleProductHandler={singleProductHandler}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default GridView;
