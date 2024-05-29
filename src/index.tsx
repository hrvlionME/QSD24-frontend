import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
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
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import UPFavoritesPage from "./pages/UserPanel/UPFavoritesPage/UPFavoritesPage";
import UPEditProfilePage from "./pages/UserPanel/UPEditProfilePage/UPEditProfilePage";
import UPUserDataPage from "./pages/UserPanel/UPUserDataPage/UPUserDataPage";
import TwoFA from "./pages/TwoFA/TwoFA";
import UPChangePasswordPage from "./pages/UserPanel/UPChangePasswordPage/UPChangePasswordPage";
import UPMyOrdersPage from "./pages/UserPanel/UPMyOrdersPage/UPMyOrdersPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/sendCode" element={<TwoFA />} />
            <Route path="/contact-us" element={<ContactUs />}></Route>
            <Route path="/faq" element={<Faq />} />
            <Route path="/shop/:category/:id" element={<ShopPage />} />
            <Route path="/shop/favorites/:id" element={<FavoritesPage />} />
            <Route path="/profile" element={<UPUserDataPage />} />
            <Route path="/profile/edit" element={<UPEditProfilePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route
              path="/profile/change-password"
              element={<UPChangePasswordPage />}
            />
            <Route path="/profile/my-orders" element={<UPMyOrdersPage />} />
            <Route path="/profile/favorites" element={<UPFavoritesPage />} />
            <Route path="/admin/:category" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

function Main() {
  const location = useLocation();

  const isAuthPage =
    ["/login", "/signup", "/forgot-password", "/admin/:category"].includes(
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
