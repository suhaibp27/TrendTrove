import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { DataProvider } from "./contexts/DataContext";
import { CartProvider } from "./contexts/CartContext";
import ProductModal from "./components/ProductModal/ProductModal";
import Footer from "./Footer/Footer";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <DataProvider>
          <CartProvider>
            <Header />
            {/* <div className="app-content"> */}
            <Routes>
              <Route path="/" exact Component={Home} />
              <Route path="/shop" exact Component={Shop} />
              <Route path="/wishlist" exact Component={Wishlist} />
              <Route path="/cart" exact Component={Cart} />
            </Routes>
            <ProductModal />
            {/* </div> */}
            <Footer />
          </CartProvider>
        </DataProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
