import "./App.css";
import Home from "./Components/Home";
import ItemScreen from "./Components/ItemScreen";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import CartScreen from "./Components/CartScreen";
import CheckoutScreen from "./Components/CheckoutScreen";
import ThankyouScreen from "./Components/ThankyouScreen";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ItemScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartScreen/>} />
        <Route path="/checkout" element={<CheckoutScreen />} />
        <Route path="/thankyou" element={<ThankyouScreen />} />
      </Routes>
    </div>
  );
}

export default App;
