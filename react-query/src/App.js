import "./App.css";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";

function App() {
  return (
    <div className="App">
      <h1 className="ct">React Query</h1>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:productID" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
