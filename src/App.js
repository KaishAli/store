import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./components/HomePage";
import BuyNow from "./components/BuyNow";
import CartPage from "./components/CartPage";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>

      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/BuyNow" element={<BuyNow />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;