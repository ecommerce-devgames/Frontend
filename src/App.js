import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { setProduct } from "./state/product";
import { setUser } from "./state/user";
import { setGenres, setDevelopers, setPlatforms } from "./state/gameProperties";
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

  //Handlers and functions
  useEffect(() => {
    dispatch(setProduct(JSON.parse(localStorage.getItem("singleProduct"))));
    axios
      .get("http://localhost:3001/api/user/me", { withCredentials: true })
      .then((res) => res.data)
      .then((data) => dispatch(setUser(data)));
    axios
      .get("http://localhost:3001/api/genres/", { withCredentials: true })
      .then((res) => dispatch(setGenres(res.data)));
      axios
      .get("http://localhost:3001/api/developers/", { withCredentials: true })
      .then((res) => dispatch(setDevelopers(res.data)));
      axios
      .get("http://localhost:3001/api/platforms/", { withCredentials: true })
      .then((res) => dispatch(setPlatforms(res.data)));
      
    //dispatch(setCart(JSON.parse(localStorage.getItem('cart'))));
    // eslint-disable-next-line
  }, []);

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
