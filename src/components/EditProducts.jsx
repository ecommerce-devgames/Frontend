import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import Input from "../commons/Input";
import ProductData from "../commons/ProductData.jsx";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";

const EditProducts = () => {
  //Hooks
  const params = useParams();
  const name = useInput();
  const description = useInput();
  const playtime = useInput();
  const released = useInput();
  const price = useInput();
  const image = useInput();
  const [gameGenres, setGameGenres] = useState([]);
  const [gameDevelopers, setGameDevelopers] = useState([]);
  const [gamePlatforms, setGamePlatforms] = useState([]);

  //States
  const [selectedGame, setSelectedGame] = useState("");
  const genres = useSelector((state) => state.gameProperties.genres[0]);
  const developers = useSelector((state) => state.gameProperties.developers[0]);
  const platforms = useSelector((state) => state.gameProperties.platforms[0]);

  console.log(useSelector((state) => state.gameProperties.developers[0]));
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

  const handleGenresChange = (event) => {
    const {
      target: { value },
    } = event;
    setGameGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(gameGenres);
  };

  const handleDevelopersChange = (event) => {
    const {
      target: { value },
    } = event;
    setGameDevelopers(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(gameDevelopers);
  };

  const handlePlatformsChange = (event) => {
    const {
      target: { value },
    } = event;
    setGamePlatforms(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(gamePlatforms);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (params.id) {
      axios
        .post(
          `http://localhost:3001/api/games/admin/edit/${Number(params.id)}`,
          {
            name: name.value,
            description: description.value,
            playtime: playtime.value,
            released: released.value,
            price: price.value,
            poster: image.value,
            genres: gameGenres,
            developers: gameDevelopers,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
        });
    } else {
      axios
        .post(
          `http://localhost:3001/api/games/admin/create`,
          {
            name: name.value,
            description: description.value,
            playtime: playtime.value,
            released: released.value,
            price: price.value,
            poster: image.value,
            genres: gameGenres,
            developers: gameDevelopers,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
        });
    }
  };
  console.log(gameGenres);
  return (
    <div className="editProductsWrapper">
      {params.id ? (
        <div className="dataSheetWrapper">
          <p className="editProductTitle">Current information</p>
          <div className="editDataSheet">
            <ProductData
              title="Image"
              info={
                <img
                  className="editProductImg"
                  src={selectedGame.background_image}
                  alt="product"
                />
              }
            />
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
        <form className="editForm" onSubmit={onSubmitHandler}>
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
          <FormControl
            className="createProductSelect"
            sx={{ m: 1, minWidth: 120, color: "primary" }}
          >
            <InputLabel
              sx={{ color: "#fff", fontSize: "1.3rem" }}
              id="demo-multiple-checkbox-label"
            >
              Genres
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={gameGenres}
              onChange={handleGenresChange}
              input={<OutlinedInput label="Genres" />}
              renderValue={(selected) => selected.join(", ")}
              sx={{
                
                bgcolor: "rgba(255, 255, 255, 0.07)",
                color: "#fff",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              //color="primary"
            >
              {genres.map((genre) => (
                <MenuItem
                  className="createProductSelectItem"
                  key={genre.id}
                  value={genre.name}
                  color="primary"
                >
                  <Checkbox checked={gameGenres.indexOf(genre.name) > -1} />
                  <ListItemText primary={genre.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            className="createProductSelect"
            sx={{ m: 1, minWidth: 120, color: "primary" }}
          >
            <InputLabel
              sx={{ color: "#fff", fontSize: "1.3rem" }}
              id="demo-multiple-checkbox-label"
            >
              Developers
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={gameDevelopers}
              onChange={handleDevelopersChange}
              input={<OutlinedInput label="Developers" />}
              renderValue={(selected) => selected.join(", ")}
              sx={{
                
                bgcolor: "rgba(255, 255, 255, 0.07)",
                color: "#fff",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              //color="primary"
            >
              {developers.map((developer) => (
                <MenuItem
                  className="createProductSelectItem"
                  key={developer.id}
                  value={developer.name}
                  color="primary"
                >
                  <Checkbox
                    checked={gameDevelopers.indexOf(developer.name) > -1}
                  />
                  <ListItemText primary={developer.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            className="createProductSelect"
            sx={{ m: 1, minWidth: 120, color: "primary" }}
          >
            <InputLabel
              sx={{ color: "#fff", fontSize: "1.3rem" }}
              id="demo-multiple-checkbox-label"
            >
              Platforms
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={gamePlatforms}
              onChange={handlePlatformsChange}
              input={<OutlinedInput label="Platforms" />}
              renderValue={(selected) => selected.join(", ")}
              sx={{
                
                bgcolor: "rgba(255, 255, 255, 0.07)",
                color: "#fff",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              //color="primary"
            >
              {platforms.map((platforms) => (
                <MenuItem
                  className="createProductSelectItem"
                  key={platforms.id}
                  value={platforms.name}
                  color="primary"
                >
                  <Checkbox
                    checked={gamePlatforms.indexOf(platforms.name) > -1}
                  />
                  <ListItemText primary={platforms.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>        
          <input className="imageInput" type="file" name="file" placeholder="Insert img" {...image}/>
          <button className="registerButton" type="submit">
            {params.id ? "Change" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
