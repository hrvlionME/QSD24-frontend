import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import NavbarPage from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import "./index.css";
import "./colors.css";
import Faq from "./pages/FAQ/Faq";
import ContactUs from "./pages/ContactUsPage/ContactUs";
import { Provider, useSelector } from "react-redux";
import store, { RootState, persistor } from "./redux/store";
import TwoFA from "./pages/TwoFA/TwoFA";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import { PersistGate } from 'redux-persist/integration/react';
import CartPage from "./pages/CartPage/CartPage";
import UserPanel from "./pages/UserPanel/UserPanel";
import "./i18n";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const stripePromise = loadStripe('pk_test_51PMQchKZoDCpubn2bI9WLY1IXjMt4KUV16IvFKRFXAMmXQGdV1XS7DjzdxFNr4lYD8ZDPMcHMfWGfuVEYdxvWSod002MraW1y6', {
    locale: 'en',
  });

  
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
        <ToastContainer />
      </Elements>
    </PersistGate>
  </Provider>
  );
}

function MainRoutes() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<HomePage />} />
        {!user.loggedIn && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/send-code" element={<TwoFA />} />
          </>
        )}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/shop/:category/:id" element={<ShopPage />} />
        <Route path="/shop/favorites/:id" element={<FavoritesPage />} />
        <Route path="/profile/:category?" element={<UserPanel />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        {user.role === "1" &&
          <Route path="/admin/:category?" element={<AdminPage />} />
        }
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

function Main() {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);

  const isAuthPage =
    ["/login", "/signup", "/forgot-password", "/admin/:category", "/payment", "/send-code"].includes(
      location.pathname
    ) || location.pathname.startsWith("/admin");

  return (
    <>
      {!isAuthPage && <NavbarPage />}
      <Outlet />
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
