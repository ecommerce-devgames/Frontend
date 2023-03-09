import "./App.css";
import {useEffect} from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { setProduct } from "./state/product";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Product from "./components/Product";
import Cart from "./components/Cart"

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{  
    dispatch(setProduct(JSON.parse(localStorage.getItem("singleProduct"))))
  }, [])

  return (
    <div className="appContainer">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart /> } /> 
      </Routes>
    </div>
  );
}

export default App;
