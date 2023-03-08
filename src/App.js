import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Product from "./components/Product";

function App() {
  return (
    <div className="appContainer">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
