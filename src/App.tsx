import "./App.css";
import Home from "./Components/Home";
import ItemScreen from "./Components/ItemScreen";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ItemScreen />} />
      </Routes>
    </div>
  );
}

export default App;
