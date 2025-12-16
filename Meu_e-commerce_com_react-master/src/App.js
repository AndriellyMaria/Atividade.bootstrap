import { Routes, Route } from "react-router-dom";
import React from 'react';
import './styles.css';

import Header from './Components/Header';
import Navigation from './Components/Navigation';
import Hero from './Components/Hero';
import About from './Components/About';
import Services from './Components/Services';
import Stats from './Components/Stats';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

import Chat from "./Pages/Chat";
import Perfil from "./Pages/Perfil";
import Notificacoes from "./Pages/Notificacoes";
import Suporte from "./Pages/Suporte";


import Store from "./Components/Store";
import ProductPage from "./Components/ProductPage";
import CartPage from "./Components/CartPage";
import CheckoutPage from "./Components/CheckoutPage";
import OrderPending from "./Components/OrderPending";
import OrderTracking from "./Components/OrderTracking";
import Login from "./Pages/Login";
import ProductDetails from "./Components/ProductDetails";
import OrderConfirmation from "./Components/OrderConfirmation";
import TopBar from "./Components/TopBar";

function App() {
  return (
    <div className="App">
      <TopBar />
      <Header />
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Services />
              <Stats />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route path="/store" element={<Store />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/suporte" element={<Suporte />} />

        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-pending" element={<OrderPending />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/login" element={<Login />} />
  <Route path="/produto/:id" element={<ProductDetails />} />
  <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>

    </div>
  );
}
export default App;