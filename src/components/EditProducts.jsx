import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useInput from "../hooks/useInput";
import Input from "../commons/Input";
import ProductData from "../commons/ProductData.jsx";

const EditProducts = () => {
  //Hooks
  const params = useParams();
  console.log(params);
  const name = useInput();
  const description = useInput();
  const playtime = useInput();
  const released = useInput();
  const price = useInput();

  //States
  const [selectedGame, setSelectedGame] = useState("");

  //Handlers
  useEffect(() => {
    if (params.id) {
      axios
        .get(
          `https://api.rawg.io/api/games/${Number(
            params.id
          )}?key=679adbda4ffc4cd5a68fad9b1e98f040&dates=2019-09-01,2019-09-30&platforms=18,1,7`
        )
        .then((res) => {
          setSelectedGame(res.data);
        });
    }
  }, [params]);

 const onSubmitHandler = (e) => {
e.preventDefault();
console.log( {
          name: name.value,
          description: description.value,
          playtime: playtime.value,
          released: released.value, 
          price: price.value
        })
  //if (params.id) {
    //   axios
    //     .post(
    //       `http://localhost:3001/api/games/admin/edit/${Number(params.id)}`,
    //       {
    //         name: name.value,
            // description: description.value,
            // playtime: playtime.value,
            // released: released.value,
            // price: price.value
    //       },
    //       { withCredentials: true }
    //     )
    //     .then((res) => {
    //       console.log(res)
    //     });
  //} else {
    //   axios
    //     .post(
    //       `http://localhost:3001/api/games/admin/create`,
    //       {
    //             name: name.value,
            // description: description.value,
            // playtime: playtime.value,
            // released: released.value,
            // price: price.value
    //       },
    //       { withCredentials: true }
    //     )
    //     .then((res) => {
    //       dconsole.log(res)
    //     });
  //}

  };

  
  return (
    <div className="editProductsWrapper">
      {params.id ? (
        <div className="dataSheetWrapper">
          <p style={{color:"white", fontSize: "3rem"}}>Current information</p>
          <div className="editDataSheet">
            <ProductData title="Name" info={selectedGame.name} />
            <ProductData
              title="Description"
              info={selectedGame.description_raw}
            />
            <ProductData title="Release Date" info={selectedGame.released} />
            <ProductData title="Playtime" info={selectedGame.playtime} />
            <ProductData title="Price" info="60" />
          </div>
        </div>
      ) : null}

      <div className="editConteiner">
        <form className="loginForm" onSubmit={onSubmitHandler}>
          {params.id ? (
            <h3 className="registerTitle">Edit product</h3>
          ) : (
            <h3 className="registerTitle">Create product</h3>
          )}
          <Input
            name="name"
            type="text"
            placeholder="Name"
            valueHandler={name}
          />
          <Input
            name="description"
            type="textarea"
            placeholder="Description"
            valueHandler={description}
          />
          <Input
            name="playtime"
            type="text"
            placeholder="Playtime"
            valueHandler={playtime}
          />
          <Input
            name="released"
            type="date"
            placeholder="Release date"
            valueHandler={released}
          />
          <Input
            name="price"
            type="number"
            placeholder="Price"
            valueHandler={price}
          />
          <button className="registerButton" type="submit">
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
