import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "./state/product";
import { setUser } from "./state/user";
import { setGenres } from "./state/genres";
import { setDevelopers } from "./state/developers";
import { setPlatforms } from "./state/platforms";
import { setTags } from "./state/tags";
import { importCartFromLs, importCartFromDb } from "./state/cart";
import Home from "./commons/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Product from "./components/Product";
import Cart from "./components/Cart";
import EditProducts from "./components/EditProducts";
import EditUsers from "./components/EditUsers";
import EditCategories from "./components/EditCategories";
import History from "./components/History";

function App() {
  //Hooks
  const dispatch = useDispatch();

  //States
  const cart = useSelector((state) => state.cart);
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);

  //Handlers and functions
  useEffect(() => {
    dispatch(setProduct(JSON.parse(localStorage.getItem("singleProduct"))));
    axios
      .get("http://localhost:3001/api/user/me", { withCredentials: true })
      .then((res) => res.data)
      .then((data) => dispatch(setUser(data)));
    axios
      .get("http://localhost:3001/api/genres/", { withCredentials: true })
      .then((res) => {        
        dispatch(setGenres(res.data));
      });
    axios
      .get("http://localhost:3001/api/developers/", { withCredentials: true })
      .then((res) => {        
        dispatch(setDevelopers(res.data));
      });
    axios
      .get("http://localhost:3001/api/platforms/", { withCredentials: true })
      .then((res) => {        
        dispatch(setPlatforms(res.data));
      });
     
      console.log("el id del user es", user.id)
      if (user.id) {
        axios
          .get(`http://localhost:3001/api/cart/${user.id}`, {
            withCredentials: true,
          })
          .then((res) => dispatch(importCartFromDb(res.data)));
      } else {
       dispatch(importCartFromLs(JSON.parse(localStorage.getItem("cart"))));
      };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // dispatch(
    //   setCartTotalPrice(cart.reduce((acc, game) => (acc += game.price), 0))
    // );
   
    localStorage.setItem("cart", JSON.stringify(cart)); 
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(product));
  }, [product]);


  return (
    <div className="appContainer">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Shopping history" element={<History />} />
        <Route path="/create/products" element={<EditProducts />} />
        <Route path="/edit/products/:id" element={<EditProducts />} />
        <Route path="/edit/users" element={<EditUsers />} />
        <Route path="/edit/categories" element={<EditCategories />} />
        <Route path="/search" element={<Home />} />
        <Route path="/category/:category" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
