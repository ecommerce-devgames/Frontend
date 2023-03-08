import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../commons/Card";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { setProduct } from "../state/product";
import { useNavigate } from "react-router";

const GridContainer = () => {
  const [data, setData] = useState([]);
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

        navigate(`/products/${res.data.id}`);
      });
  };

  console.log(data);
  if (!data) return <h5>No content</h5>;
  return (
    <div className="gridContainer">
      <Grid container rowSpacing={6} columnSpacing={3}>
        {data.map((item) => {
          return (
            <Grid item xs={3}>
              <Card
                key={item.id}
                item={item}
                singleProductHandler={singleProductHandler}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
    // <div className="gridContainer">
    //   {data.map((item)=>{
    //     return <Card key={item.id} item={item} singleProductHandler={singleProductHandler}/>
    //   })}

    // </div>
  );
};

export default GridContainer;
